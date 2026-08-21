import {
  CreateSavedPlaceInput,
  SavedPlace,
  SavedPlaceKind,
  SavedPlaceNavigationRequest,
  SavedPlacesRepository,
  UpdateSavedPlaceInput,
} from "./types";

export class SavedPlaceNotFoundError extends Error {
  constructor(id: string) {
    super(`Saved place not found: ${id}`);
    this.name = "SavedPlaceNotFoundError";
  }
}

export class SavedPlaceValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SavedPlaceValidationError";
  }
}

export class SavedPlaceKindConflictError extends Error {
  constructor(kind: Exclude<SavedPlaceKind, "favorite">) {
    super(`Only one ${kind} saved place is allowed`);
    this.name = "SavedPlaceKindConflictError";
  }
}

export type SavedPlacesServiceOptions = Readonly<{
  idFactory?: () => string;
  now?: () => string;
}>;

const defaultIdFactory = () =>
  `sp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
const defaultNow = () => new Date().toISOString();

function requiredTrimmed(value: string, field: string): string {
  const trimmed = value.trim();
  if (!trimmed) throw new SavedPlaceValidationError(`${field} is required`);
  return trimmed;
}

function normalizeIcon(icon: string | null | undefined): string | null {
  if (icon === undefined || icon === null) return null;
  const trimmed = icon.trim();
  return trimmed || null;
}

function defaultIconForKind(kind: SavedPlaceKind): string | null {
  if (kind === "home") return "home";
  if (kind === "work") return "work";
  return null;
}

function iconForUpdate(
  kind: SavedPlaceKind,
  currentIcon: string | null,
  patchIcon: string | null | undefined,
): string | null {
  if (patchIcon === undefined) return currentIcon;
  return normalizeIcon(patchIcon) ?? defaultIconForKind(kind);
}

export class SavedPlacesService {
  private readonly idFactory: () => string;
  private readonly now: () => string;

  constructor(
    private readonly repository: SavedPlacesRepository,
    options: SavedPlacesServiceOptions = {},
  ) {
    this.idFactory = options.idFactory ?? defaultIdFactory;
    this.now = options.now ?? defaultNow;
  }

  list(): Promise<readonly SavedPlace[]> {
    return this.repository.list();
  }

  async create(input: CreateSavedPlaceInput): Promise<SavedPlace> {
    const places = [...(await this.repository.list())];
    this.assertKindAvailable(places, input.kind);

    const timestamp = this.now();
    const place: SavedPlace = {
      id: requiredTrimmed(this.idFactory(), "id"),
      kind: input.kind,
      name: requiredTrimmed(input.name, "name"),
      destinationText: requiredTrimmed(input.destinationText, "destinationText"),
      icon: normalizeIcon(input.icon) ?? defaultIconForKind(input.kind),
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    if (places.some((existing) => existing.id === place.id)) {
      throw new SavedPlaceValidationError(`Duplicate generated id: ${place.id}`);
    }

    await this.repository.replaceAll([...places, place]);
    return place;
  }

  async update(id: string, patch: UpdateSavedPlaceInput): Promise<SavedPlace> {
    const places = [...(await this.repository.list())];
    const index = places.findIndex((place) => place.id === id);
    if (index < 0) throw new SavedPlaceNotFoundError(id);

    const current = places[index];
    const updated: SavedPlace = {
      ...current,
      name: patch.name === undefined ? current.name : requiredTrimmed(patch.name, "name"),
      destinationText:
        patch.destinationText === undefined
          ? current.destinationText
          : requiredTrimmed(patch.destinationText, "destinationText"),
      icon: iconForUpdate(current.kind, current.icon, patch.icon),
      updatedAt: this.now(),
    };

    places[index] = updated;
    await this.repository.replaceAll(places);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const places = [...(await this.repository.list())];
    const next = places.filter((place) => place.id !== id);
    if (next.length === places.length) throw new SavedPlaceNotFoundError(id);
    await this.repository.replaceAll(next);
  }

  async reorder(orderedIds: readonly string[]): Promise<readonly SavedPlace[]> {
    const places = [...(await this.repository.list())];
    if (orderedIds.length !== places.length || new Set(orderedIds).size !== orderedIds.length) {
      throw new SavedPlaceValidationError("Reorder must contain every saved place id exactly once");
    }

    const byId = new Map(places.map((place) => [place.id, place] as const));
    const reordered = orderedIds.map((id) => {
      const place = byId.get(id);
      if (!place) throw new SavedPlaceValidationError(`Unknown saved place id in reorder: ${id}`);
      return place;
    });

    await this.repository.replaceAll(reordered);
    return reordered;
  }

  async navigationRequest(
    id: string,
    confirmed: boolean,
  ): Promise<SavedPlaceNavigationRequest | null> {
    if (!confirmed) return null;

    const place = (await this.repository.list()).find((candidate) => candidate.id === id);
    if (!place) throw new SavedPlaceNotFoundError(id);

    return {
      source: "saved-place",
      savedPlaceId: place.id,
      destinationText: place.destinationText,
    };
  }

  private assertKindAvailable(places: readonly SavedPlace[], kind: SavedPlaceKind): void {
    if (kind === "favorite") return;
    if (places.some((place) => place.kind === kind)) {
      throw new SavedPlaceKindConflictError(kind);
    }
  }
}
