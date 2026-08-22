import AsyncStorage from "@react-native-async-storage/async-storage";

import { decodeSavedPlaces, encodeSavedPlaces } from "./codec";
import {
  SavedPlace,
  SavedPlacesRepository,
  SavedPlacesStorage,
  SavedPlacesStorageReadResult,
} from "./types";

export const SAVED_PLACES_STORAGE_KEY = "nexo.saved-places.v1";

export class SavedPlacesStorageReadError extends Error {
  constructor() {
    super("Unable to read saved places");
    this.name = "SavedPlacesStorageReadError";
  }
}

export class SavedPlacesStorageWriteError extends Error {
  constructor() {
    super("Unable to persist saved places");
    this.name = "SavedPlacesStorageWriteError";
  }
}

export class AsyncStorageSavedPlacesStorage implements SavedPlacesStorage {
  async readItem(key: string): Promise<SavedPlacesStorageReadResult> {
    try {
      const raw = await AsyncStorage.getItem(key);
      if (raw === null) return { ok: true, value: null };
      const parsed = JSON.parse(raw);
      return typeof parsed === "string"
        ? { ok: true, value: parsed }
        : { ok: false };
    } catch {
      return { ok: false };
    }
  }

  async writeItem(key: string, value: string): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }
}

// Saved places have one canonical storage namespace. Serializing by namespace,
// rather than storage-adapter object identity, protects distinct repository/storage
// instances that still target the same underlying AsyncStorage key.
const mutationQueues = new Map<string, Promise<void>>();

function queueFor(storageKey: string): Promise<void> {
  return mutationQueues.get(storageKey) ?? Promise.resolve();
}

export class LocalSavedPlacesRepository implements SavedPlacesRepository {
  constructor(
    private readonly storage: SavedPlacesStorage,
    private readonly storageKey = SAVED_PLACES_STORAGE_KEY,
  ) {}

  async list(): Promise<readonly SavedPlace[]> {
    const result = await this.storage.readItem(this.storageKey);
    if (!result.ok) throw new SavedPlacesStorageReadError();
    return decodeSavedPlaces(result.value);
  }

  async replaceAll(places: readonly SavedPlace[]): Promise<void> {
    const persisted = await this.storage.writeItem(this.storageKey, encodeSavedPlaces(places));
    if (!persisted) throw new SavedPlacesStorageWriteError();
  }

  async mutate<T>(
    operation: (
      places: readonly SavedPlace[],
    ) =>
      | Promise<Readonly<{ places: readonly SavedPlace[]; result: T }>>
      | Readonly<{ places: readonly SavedPlace[]; result: T }>,
  ): Promise<T> {
    const previous = queueFor(this.storageKey);
    let release!: () => void;
    const current = new Promise<void>((resolve) => {
      release = resolve;
    });
    mutationQueues.set(this.storageKey, current);

    await previous;
    try {
      const places = await this.list();
      const mutation = await operation(places);
      await this.replaceAll(mutation.places);
      return mutation.result;
    } finally {
      release();
      if (mutationQueues.get(this.storageKey) === current) {
        mutationQueues.delete(this.storageKey);
      }
    }
  }
}
