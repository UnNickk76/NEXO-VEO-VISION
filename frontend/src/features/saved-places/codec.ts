import { SavedPlace, SavedPlaceKind } from "./types";

const FORMAT_VERSION = "nexo-saved-places-v1";
const FIELD_SEPARATOR = "|";
const RECORD_SEPARATOR = "\n";
const KINDS = new Set<SavedPlaceKind>(["home", "work", "favorite"]);

export class SavedPlacesCorruptDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SavedPlacesCorruptDataError";
  }
}

function encodeField(value: string): string {
  return encodeURIComponent(value);
}

function decodeField(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    throw new SavedPlacesCorruptDataError("Invalid percent-encoding in saved places payload");
  }
}

export function encodeSavedPlaces(places: readonly SavedPlace[]): string {
  const records = places.map((place) =>
    [
      place.id,
      place.kind,
      place.name,
      place.destinationText,
      place.icon ?? "",
      place.createdAt,
      place.updatedAt,
    ]
      .map(encodeField)
      .join(FIELD_SEPARATOR),
  );

  return [FORMAT_VERSION, ...records].join(RECORD_SEPARATOR);
}

export function decodeSavedPlaces(payload: string | null): readonly SavedPlace[] {
  if (payload === null || payload === "") return [];

  const [version, ...records] = payload.split(RECORD_SEPARATOR);
  if (version !== FORMAT_VERSION) {
    throw new SavedPlacesCorruptDataError("Unsupported saved places format");
  }

  const ids = new Set<string>();
  let homeCount = 0;
  let workCount = 0;

  return records.filter(Boolean).map((record, index) => {
    const fields = record.split(FIELD_SEPARATOR);
    if (fields.length !== 7) {
      throw new SavedPlacesCorruptDataError(`Invalid saved place record at index ${index}`);
    }

    const [idRaw, kindRaw, nameRaw, destinationRaw, iconRaw, createdRaw, updatedRaw] = fields;
    const id = decodeField(idRaw);
    const kind = decodeField(kindRaw) as SavedPlaceKind;
    const name = decodeField(nameRaw);
    const destinationText = decodeField(destinationRaw);
    const icon = decodeField(iconRaw) || null;
    const createdAt = decodeField(createdRaw);
    const updatedAt = decodeField(updatedRaw);

    if (!id || !name || !destinationText || !KINDS.has(kind)) {
      throw new SavedPlacesCorruptDataError(`Invalid saved place values at index ${index}`);
    }
    if (ids.has(id)) {
      throw new SavedPlacesCorruptDataError(`Duplicate saved place id: ${id}`);
    }
    ids.add(id);

    if (kind === "home" && ++homeCount > 1) {
      throw new SavedPlacesCorruptDataError("Multiple home places are not allowed");
    }
    if (kind === "work" && ++workCount > 1) {
      throw new SavedPlacesCorruptDataError("Multiple work places are not allowed");
    }

    return { id, kind, name, destinationText, icon, createdAt, updatedAt };
  });
}
