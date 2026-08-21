import assert from "node:assert/strict";

import {
  LocalSavedPlacesRepository,
  SavedPlaceKindConflictError,
  SavedPlaceStaleConfirmationError,
  SavedPlaceValidationError,
  SavedPlacesService,
  SavedPlacesStorageReadError,
  SavedPlacesStorageWriteError,
} from "../../out/features/saved-places/index.js";

class MemoryStorage {
  value = null;
  failReads = false;
  failWrites = false;

  async readItem() {
    if (this.failReads) return { ok: false };
    return { ok: true, value: this.value };
  }

  async writeItem(_key, value) {
    if (this.failWrites) return false;
    await Promise.resolve();
    this.value = String(value);
    return true;
  }
}

async function expectReject(promise, type) {
  let error;
  try {
    await promise;
  } catch (caught) {
    error = caught;
  }
  assert.ok(error instanceof type, `expected ${type.name}, got ${String(error)}`);
}

const storage = new MemoryStorage();
const repository = new LocalSavedPlacesRepository(storage);
const ids = ["home-1", "work-1", "fav-1", "fav-2"];
let tick = 0;
const service = new SavedPlacesService(repository, {
  idFactory: () => ids.shift() ?? "unexpected-id",
  now: () => `2026-08-21T20:46:${String(tick++).padStart(2, "0")}Z`,
});

const [home, work] = await Promise.all([
  service.create({ kind: "home", name: " Casa ", destinationText: " Via Roma 1 " }),
  service.create({ kind: "work", name: "Lavoro", destinationText: "Via Ufficio 3" }),
]);
assert.deepEqual((await service.list()).map((place) => place.id), [home.id, work.id]);
assert.equal(home.icon, "home");
assert.equal(work.icon, "work");

await expectReject(
  service.create({ kind: "home", name: "Seconda casa", destinationText: "Via Due 2" }),
  SavedPlaceKindConflictError,
);

const favorite = await service.create({
  kind: "favorite",
  name: "Parcheggio | centro %",
  destinationText: "Piazza\nGrande 4",
});

const restarted = new SavedPlacesService(new LocalSavedPlacesRepository(storage));
assert.deepEqual(
  (await restarted.list()).map((place) => place.id),
  [home.id, work.id, favorite.id],
);
assert.equal((await restarted.list())[2].destinationText, "Piazza\nGrande 4");

const homeWithBlankIcon = await service.update(home.id, { icon: "   " });
assert.equal(homeWithBlankIcon.icon, "home");

const confirmation = await service.confirmNavigation(home.id);
await service.update(home.id, { destinationText: "Via Nuova 9" });
await expectReject(service.navigationRequest(confirmation), SavedPlaceStaleConfirmationError);
const freshConfirmation = await service.confirmNavigation(home.id);
assert.deepEqual(await service.navigationRequest(freshConfirmation), {
  source: "saved-place",
  savedPlaceId: home.id,
  destinationText: "Via Nuova 9",
});

const updated = await service.update(favorite.id, { name: "Centro", icon: " star " });
assert.equal(updated.name, "Centro");
assert.equal(updated.icon, "star");

const reordered = await service.reorder([favorite.id, home.id, work.id]);
assert.deepEqual(reordered.map((place) => place.id), [favorite.id, home.id, work.id]);
await expectReject(service.reorder([favorite.id, home.id]), SavedPlaceValidationError);

const beforeReadFailure = storage.value;
storage.failReads = true;
await expectReject(
  service.create({ kind: "favorite", name: "Non perdere dati", destinationText: "Nowhere" }),
  SavedPlacesStorageReadError,
);
assert.equal(storage.value, beforeReadFailure);
storage.failReads = false;

await service.remove(work.id);
assert.equal((await restarted.list()).some((place) => place.id === work.id), false);

storage.failWrites = true;
await expectReject(
  service.create({ kind: "favorite", name: "Fail", destinationText: "Nowhere" }),
  SavedPlacesStorageWriteError,
);

console.log("saved-places checks: PASS");
