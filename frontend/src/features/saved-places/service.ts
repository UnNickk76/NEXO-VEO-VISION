import {
  CreateSavedPlaceInput,
  SavedPlace,
  SavedPlaceKind,
  SavedPlaceNavigationConfirmation,
  SavedPlaceNavigationRequest,
  SavedPlacesRepository,
  UpdateSavedPlaceInput,
} from "./types";

export class SavedPlaceNotFoundError extends Error {
  constructor(id: string) { super(`Saved place not found: ${id}`); this.name = "SavedPlaceNotFoundError"; }
}
export class SavedPlaceValidationError extends Error {
  constructor(message: string) { super(message); this.name = "SavedPlaceValidationError"; }
}
export class SavedPlaceKindConflictError extends Error {
  constructor(kind: Exclude<SavedPlaceKind, "favorite">) { super(`Only one ${kind} saved place is allowed`); this.name = "SavedPlaceKindConflictError"; }
}
export class SavedPlaceStaleConfirmationError extends Error {
  constructor(id: string) { super(`Saved place changed after confirmation: ${id}`); this.name = "SavedPlaceStaleConfirmationError"; }
}

export type SavedPlacesServiceOptions = Readonly<{ idFactory?: () => string; now?: () => string }>;
const defaultIdFactory = () => `sp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
const defaultNow = () => new Date().toISOString();

function requiredTrimmed(value: string, field: string): string {
  const trimmed = value.trim();
  if (!trimmed) throw new SavedPlaceValidationError(`${field} is required`);
  return trimmed;
}
function normalizeIcon(icon: string | null | undefined): string | null {
  if (icon === undefined || icon === null) return null;
  const trimmed = icon.trim(); return trimmed || null;
}
function defaultIconForKind(kind: SavedPlaceKind): string | null {
  if (kind === "home") return "home";
  if (kind === "work") return "work";
  return null;
}
function iconForUpdate(kind: SavedPlaceKind, currentIcon: string | null, patchIcon: string | null | undefined): string | null {
  if (patchIcon === undefined) return currentIcon;
  return normalizeIcon(patchIcon) ?? defaultIconForKind(kind);
}

export class SavedPlacesService {
  private readonly idFactory: () => string;
  private readonly now: () => string;

  constructor(private readonly repository: SavedPlacesRepository, options: SavedPlacesServiceOptions = {}) {
    this.idFactory = options.idFactory ?? defaultIdFactory;
    this.now = options.now ?? defaultNow;
  }

  list(): Promise<readonly SavedPlace[]> { return this.repository.list(); }

  create(input: CreateSavedPlaceInput): Promise<SavedPlace> {
    return this.repository.mutate((current) => {
      const places = [...current];
      this.assertKindAvailable(places, input.kind);
      const timestamp = this.now();
      const place: SavedPlace = {
        id: requiredTrimmed(this.idFactory(), "id"), kind: input.kind,
        name: requiredTrimmed(input.name, "name"),
        destinationText: requiredTrimmed(input.destinationText, "destinationText"),
        icon: normalizeIcon(input.icon) ?? defaultIconForKind(input.kind),
        createdAt: timestamp, updatedAt: timestamp,
      };
      if (places.some((existing) => existing.id === place.id)) throw new SavedPlaceValidationError(`Duplicate generated id: ${place.id}`);
      return { places: [...places, place], result: place };
    });
  }

  update(id: string, patch: UpdateSavedPlaceInput): Promise<SavedPlace> {
    return this.repository.mutate((currentPlaces) => {
      const places = [...currentPlaces];
      const index = places.findIndex((place) => place.id === id);
      if (index < 0) throw new SavedPlaceNotFoundError(id);
      const current = places[index];
      const updated: SavedPlace = {
        ...current,
        name: patch.name === undefined ? current.name : requiredTrimmed(patch.name, "name"),
        destinationText: patch.destinationText === undefined ? current.destinationText : requiredTrimmed(patch.destinationText, "destinationText"),
        icon: iconForUpdate(current.kind, current.icon, patch.icon), updatedAt: this.now(),
      };
      places[index] = updated;
      return { places, result: updated };
    });
  }

  remove(id: string): Promise<void> {
    return this.repository.mutate((places) => {
      const next = places.filter((place) => place.id !== id);
      if (next.length === places.length) throw new SavedPlaceNotFoundError(id);
      return { places: next, result: undefined };
    });
  }

  reorder(orderedIds: readonly string[]): Promise<readonly SavedPlace[]> {
    return this.repository.mutate((places) => {
      if (orderedIds.length !== places.length || new Set(orderedIds).size !== orderedIds.length) throw new SavedPlaceValidationError("Reorder must contain every saved place id exactly once");
      const byId = new Map(places.map((place) => [place.id, place] as const));
      const reordered = orderedIds.map((id) => {
        const place = byId.get(id);
        if (!place) throw new SavedPlaceValidationError(`Unknown saved place id in reorder: ${id}`);
        return place;
      });
      return { places: reordered, result: reordered };
    });
  }

  async confirmNavigation(id: string): Promise<SavedPlaceNavigationConfirmation> {
    const place = (await this.repository.list()).find((candidate) => candidate.id === id);
    if (!place) throw new SavedPlaceNotFoundError(id);
    return { savedPlaceId: place.id, destinationText: place.destinationText, updatedAt: place.updatedAt };
  }

  async navigationRequest(confirmation: SavedPlaceNavigationConfirmation): Promise<SavedPlaceNavigationRequest> {
    const place = (await this.repository.list()).find((candidate) => candidate.id === confirmation.savedPlaceId);
    if (!place) throw new SavedPlaceNotFoundError(confirmation.savedPlaceId);
    if (place.destinationText !== confirmation.destinationText || place.updatedAt !== confirmation.updatedAt) throw new SavedPlaceStaleConfirmationError(place.id);
    return { source: "saved-place", savedPlaceId: place.id, destinationText: place.destinationText };
  }

  private assertKindAvailable(places: readonly SavedPlace[], kind: SavedPlaceKind): void {
    if (kind === "favorite") return;
    if (places.some((place) => place.kind === kind)) throw new SavedPlaceKindConflictError(kind);
  }
}
