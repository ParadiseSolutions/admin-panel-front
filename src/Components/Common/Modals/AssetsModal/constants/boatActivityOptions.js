/** Location id for Cancun extras (Inshore*). */
export const CANCUN_LOCATION_ID = 7;

/** Known Fishing Boat type id in asset_boat_types. */
export const FISHING_BOAT_TYPE_ID = 3;

/**
 * Canonical names in charter_types_fishing (must match DB / voucher / order).
 * Left-side shorthand from product → right-side = exact name used here.
 */
export const FISHING_BOAT_ACTIVITY_NAMES = [
  "Deep Sea Fishing",
  "Bottom Fishing",
  "Snorkeling",
  "Deep Sea & Bottom Fishing",
  "Deep Sea Fishing & Snorkeling",
  "Bottom Fishing & Snorkeling",
  "Deep Sea, Bottom & Snorkeling",
  "Sunset Cruise",
];

export const CANCUN_EXTRA_ACTIVITY_NAMES = [
  "Inshore Fishing",
  "Inshore Fishing & Snorkeling",
];

/** Panga and Super Panga share the same activity set (tackle + fishing/snorkel combos). */
export const PANGA_TACKLE_ACTIVITY_NAMES = [
  "Fly Fishing",
  "Spinning Tackle",
  "Fly & Spinning Tackle",
];

export const PANGA_ACTIVITY_NAMES = [
  ...PANGA_TACKLE_ACTIVITY_NAMES,
  ...FISHING_BOAT_ACTIVITY_NAMES.filter((name) => name !== "Sunset Cruise"),
];

/** UI-only shortcuts (not saved to DB). */
export const ACTIVITY_SHORTCUT_ADD_ALL = "__activity_add_all__";
export const ACTIVITY_SHORTCUT_ADD_ALL_FISHING = "__activity_add_all_fishing__";
export const ACTIVITY_SHORTCUT_ADD_ALL_SNORKELING =
  "__activity_add_all_snorkeling__";

export const ACTIVITY_SHORTCUTS = [
  { value: ACTIVITY_SHORTCUT_ADD_ALL, label: "Add All" },
  { value: ACTIVITY_SHORTCUT_ADD_ALL_FISHING, label: "Add All Fishing" },
  {
    value: ACTIVITY_SHORTCUT_ADD_ALL_SNORKELING,
    label: "Add All Snorkeling",
  },
];

const ACTIVITY_SHORTCUT_VALUES = new Set(
  ACTIVITY_SHORTCUTS.map((item) => item.value),
);

export function isFishingBoatType(boatTypeId, boatTypeName = "") {
  return (
    Number(boatTypeId) === FISHING_BOAT_TYPE_ID ||
    /^fishing boat$/i.test(String(boatTypeName).trim())
  );
}

/** Treat "Panga" and "Super Panga" (and similar) as one family. */
export function isPangaBoatType(boatTypeName = "") {
  return /panga/i.test(String(boatTypeName).trim());
}

export function getAllowedActivityNames({
  boatTypeId,
  boatTypeName = "",
  locationId,
} = {}) {
  if (isPangaBoatType(boatTypeName)) {
    return [...PANGA_ACTIVITY_NAMES];
  }

  if (isFishingBoatType(boatTypeId, boatTypeName)) {
    const names = [...FISHING_BOAT_ACTIVITY_NAMES];
    if (Number(locationId) === CANCUN_LOCATION_ID) {
      names.push(...CANCUN_EXTRA_ACTIVITY_NAMES);
    }
    return names;
  }

  return [];
}

/** Union used by listados without boat-type context (e.g. fishing pricing). */
export function getAllManagedActivityNames() {
  return [
    ...new Set([
      ...FISHING_BOAT_ACTIVITY_NAMES,
      ...CANCUN_EXTRA_ACTIVITY_NAMES,
      ...PANGA_ACTIVITY_NAMES,
    ]),
  ];
}

function activityLabel(item) {
  return String(item?.text ?? item?.name ?? "").trim();
}

function isSunsetActivityName(name) {
  return /sunset/i.test(String(name));
}

function isSnorkelingActivityName(name) {
  return /snorkel/i.test(String(name));
}

export function filterActivityOptions(activityData, allowedNames) {
  const allowed = new Set(
    (allowedNames || []).map((name) => String(name).trim().toLowerCase()),
  );
  return (activityData || []).filter((item) =>
    allowed.has(activityLabel(item).toLowerCase()),
  );
}

/**
 * Split visible activity options into shortcut buckets.
 * - fishing: everything except Sunset and Snorkeling / snorkel combos
 * - snorkeling: Snorkeling + any snorkel combo
 */
export function classifyActivityOptions(activityOptions) {
  const all = [];
  const fishing = [];
  const snorkeling = [];

  (activityOptions || []).forEach((item) => {
    const name = activityLabel(item);
    all.push(item.id);
    if (isSnorkelingActivityName(name)) {
      snorkeling.push(item.id);
      return;
    }
    if (!isSunsetActivityName(name)) {
      fishing.push(item.id);
    }
  });

  return { all, fishing, snorkeling };
}

/**
 * Expand UI shortcuts into real activity ids. Shortcut values are never kept
 * in the returned selection (so they are not persisted).
 */
export function resolveActivitySelection(selected, activityOptions) {
  const selectedArr = selected || [];
  const shortcutHits = selectedArr.filter((value) =>
    ACTIVITY_SHORTCUT_VALUES.has(value),
  );
  const realSelected = selectedArr.filter(
    (value) => !ACTIVITY_SHORTCUT_VALUES.has(value),
  );

  if (shortcutHits.length === 0) {
    return realSelected;
  }

  const { all, fishing, snorkeling } = classifyActivityOptions(activityOptions);
  const idSet = new Set(realSelected.map((id) => Number(id)));

  shortcutHits.forEach((shortcut) => {
    const toAdd =
      shortcut === ACTIVITY_SHORTCUT_ADD_ALL
        ? all
        : shortcut === ACTIVITY_SHORTCUT_ADD_ALL_FISHING
          ? fishing
          : snorkeling;
    toAdd.forEach((id) => idSet.add(Number(id)));
  });

  return (activityOptions || [])
    .filter((item) => idSet.has(Number(item.id)))
    .map((item) => item.id);
}
