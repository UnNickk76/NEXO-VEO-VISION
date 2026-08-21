import assert from "node:assert/strict";

import {
  LocalSavedPlacesRepository,
  SavedPlaceKindConflictError,
  SavedPlaceValidationError,
  SavedPlacesService,
  SavedPlacesStorageWriteError,
} from "../../out/features/saved-places/index.js";

class MemoryStorage {
  value = null;
  failWrites = false;

  async getItem(_key, fallback) {
    return this.value === null ? fallback : this.value;
  }

  async setItem(_key, value) {
    if (this.failWrites) return false;
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
const ids = ["home-1", "work-1", "fav-1"];
let tick = 0;
const service = new SavedPlacesService(repository, {
  idFactory: () => ids.shift() ?? "unexpected-id",
  now: () => `2026-08-21T09:00:0${tick++}Z`,
});

const home = await service.create({ kind: "home", name: " Casa ", destinationText: " Via Roma 1 " });
assert.equal(home.name, "Casa");
assert.equal(home.icon, "home");

await expectReject(
  service.create({ kind: "home", name: "Seconda casa", destinationText: "Via Due 2" }),
  SavedPlaceKindConflictError,
);

const work = await service.create({ kind: "work", name: "Lavoro", destinationText: "Via Ufficio 3" });
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

const updated = await service.update(favorite.id, { name: "Centro", icon: " star " });
assert.equal(updated.name, "Centro");
assert.equal(updated.icon, "star");

const reordered = await service.reorder([favorite.id, home.id, work.id]);
assert.deepEqual(reordered.map((place) => place.id), [favorite.id, home.id, work.id]);
assert.deepEqual((await restarted.list()).map((place) => place.id), [favorite.id, home.id, work.id]);
await expectReject(service.reorder([favorite.id, home.id]), SavedPlaceValidationError);

assert.equal(await service.navigationRequest(home.id, false), null);
assert.deepEqual(await service.navigationRequest(home.id, true), {
  source: "saved-place",
  savedPlaceId: home.id,
  destinationText: "Via Roma 1",
});

await service.remove(work.id);
assert.equal((await restarted.list()).some((place) => place.id === work.id), false);

storage.failWrites = true;
await expectReject(
  service.create({ kind: "favorite", name: "Fail", destinationText: "Nowhere" }),
  SavedPlacesStorageWriteError,
);

console.log("saved-places checks: PASS");
