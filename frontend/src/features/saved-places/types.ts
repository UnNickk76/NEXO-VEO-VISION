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

export type SavedPlaceNavigationRequest = Readonly<{
  source: "saved-place";
  savedPlaceId: string;
  destinationText: string;
}>;

export interface SavedPlacesStorage {
  getItem<Fallback extends string | number | boolean | null>(
    key: string,
    fallback: Fallback,
  ): Promise<Fallback | null>;
  setItem<Value extends string | number | boolean | null>(
    key: string,
    value: Value,
  ): Promise<boolean>;
}

export interface SavedPlacesRepository {
  list(): Promise<readonly SavedPlace[]>;
  replaceAll(places: readonly SavedPlace[]): Promise<void>;
}
