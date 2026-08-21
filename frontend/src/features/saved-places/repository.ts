import { decodeSavedPlaces, encodeSavedPlaces } from "./codec";
import { SavedPlace, SavedPlacesRepository, SavedPlacesStorage } from "./types";

export const SAVED_PLACES_STORAGE_KEY = "nexo.saved-places.v1";

export class SavedPlacesStorageWriteError extends Error {
  constructor() {
    super("Unable to persist saved places");
    this.name = "SavedPlacesStorageWriteError";
  }
}

export class LocalSavedPlacesRepository implements SavedPlacesRepository {
  constructor(
    private readonly storage: SavedPlacesStorage,
    private readonly storageKey = SAVED_PLACES_STORAGE_KEY,
  ) {}

  async list(): Promise<readonly SavedPlace[]> {
    const payload = await this.storage.getItem(this.storageKey, null);
    return decodeSavedPlaces(payload);
  }

  async replaceAll(places: readonly SavedPlace[]): Promise<void> {
    const persisted = await this.storage.setItem(this.storageKey, encodeSavedPlaces(places));
    if (!persisted) throw new SavedPlacesStorageWriteError();
  }
}
