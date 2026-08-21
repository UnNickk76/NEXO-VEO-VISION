export type SavedPlaceKind = "home" | "work" | "favorite";

export type SavedPlace = Readonly<{
  id: string;
  kind: SavedPlaceKind;
  name: string;
  destinationText: string;
  icon: string | null;
  createdAt: string;
  updatedAt: string;
}>;

export type CreateSavedPlaceInput = Readonly<{
  kind: SavedPlaceKind;
  name: string;
  destinationText: string;
  icon?: string | null;
}>;

export type UpdateSavedPlaceInput = Readonly<{
  name?: string;
  destinationText?: string;
  icon?: string | null;
}>;

export type SavedPlaceNavigationConfirmation = Readonly<{
  savedPlaceId: string;
  destinationText: string;
  updatedAt: string;
}>;

export type SavedPlaceNavigationRequest = Readonly<{
  source: "saved-place";
  savedPlaceId: string;
  destinationText: string;
}>;

export type SavedPlacesStorageReadResult =
  | Readonly<{ ok: true; value: string | null }>
  | Readonly<{ ok: false }>;

export interface SavedPlacesStorage {
  readItem(key: string): Promise<SavedPlacesStorageReadResult>;
  writeItem(key: string, value: string): Promise<boolean>;
}

export interface SavedPlacesRepository {
  list(): Promise<readonly SavedPlace[]>;
  replaceAll(places: readonly SavedPlace[]): Promise<void>;
}
