/**
 * Duration allotments for custom pick-up / supported-class workflows.
 *
 * Source rules (by fishing website):
 * - Cozumel Charters (website 6): 4, 6, 8
 * - Cancun Fishing (4) + Cancun Discounts (3): 4, 6, 8
 * - PV Fishing (11): 4, 6, 8, 10, 12
 * - Cabo Fishing (1): 5, 8
 *
 * Translated to locations via location_website.sql (+ regional inference where
 * a location has no dedicated fishing website).
 */
export const DURATION_OPTIONS = [
  { value: "4 Hours", label: "4 Hours" },
  { value: "5 Hours", label: "5 Hours" },
  { value: "6 Hours", label: "6 Hours" },
  { value: "8 Hours", label: "8 Hours" },
  { value: "10 Hours", label: "10 Hours" },
  { value: "12 Hours", label: "12 Hours" },
  { value: "All Trips", label: "All Trips" },
];

const STANDARD_CARIBBEAN_FISHING = ["4 Hours", "6 Hours", "8 Hours"];
const PV_FISHING = ["4 Hours", "6 Hours", "8 Hours", "10 Hours", "12 Hours"];
const CABO_FISHING = ["5 Hours", "8 Hours"];

/** location_id → allowed duration values for custom workflows. */
export const LOCATION_DURATION_VALUES = {
  // Cabo San Lucas ← Cabo Fishing (website 1)
  1: CABO_FISHING,
  // San Jose del Cabo ← Cabo region (website 2)
  2: CABO_FISHING,
  // Ensenada ← Baja region
  3: CABO_FISHING,
  // Playa Del Carmen ← Cancun Discounts (website 3)
  4: STANDARD_CARIBBEAN_FISHING,
  // Cozumel ← Cozumel Charters (website 6)
  5: STANDARD_CARIBBEAN_FISHING,
  // Riviera Maya ← Cancun Discounts (website 3)
  6: STANDARD_CARIBBEAN_FISHING,
  // Cancun ← Cancun Fishing (4) + Cancun Discounts (3)
  7: STANDARD_CARIBBEAN_FISHING,
  // Costa Maya ← Cancun Discounts (website 3)
  8: STANDARD_CARIBBEAN_FISHING,
  // Mazatlan — no dedicated fishing website; default Caribbean set
  9: STANDARD_CARIBBEAN_FISHING,
  // Puerto Aventuras ← Cancun Discounts / PDC tours market
  10: STANDARD_CARIBBEAN_FISHING,
  // Puerto Morelos ← PDC tours market
  11: STANDARD_CARIBBEAN_FISHING,
  // Puerto Vallarta ← PV Fishing (website 11)
  12: PV_FISHING,
  // Nuevo Vallarta ← PV market (websites 8, 10)
  13: PV_FISHING,
  // Punta Maroma ← Riviera Maya market
  14: STANDARD_CARIBBEAN_FISHING,
  // Mainland
  15: STANDARD_CARIBBEAN_FISHING,
  // JS Tour
  16: STANDARD_CARIBBEAN_FISHING,
  // Tulum ← Riviera Maya market
  17: STANDARD_CARIBBEAN_FISHING,
  // La Cruz ← PV market
  19: PV_FISHING,
  // La Paz ← Baja region
  20: CABO_FISHING,
  // Punta Mita ← PV market
  21: PV_FISHING,
};

const DEFAULT_CUSTOM_WORKFLOW_DURATIONS = STANDARD_CARIBBEAN_FISHING;

export const normalizeDurationValues = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

export function getDurationOptionsForLocation(locationId) {
  if (!locationId) {
    return [];
  }

  const allowed =
    LOCATION_DURATION_VALUES[Number(locationId)] ||
    DEFAULT_CUSTOM_WORKFLOW_DURATIONS;
  const allowedSet = new Set(allowed);

  return DURATION_OPTIONS.filter(
    (option) =>
      allowedSet.has(option.value) && option.value !== "All Trips",
  );
}

export function pruneDurationValues(values, locationId) {
  const allowed = new Set(
    getDurationOptionsForLocation(locationId).map((option) => option.value),
  );
  return (values || []).filter((value) => allowed.has(value));
}

export function pruneDurationValue(value, locationId) {
  const allowed = new Set(
    getDurationOptionsForLocation(locationId).map((option) => option.value),
  );
  if (!value || !allowed.has(value)) {
    return null;
  }
  return value;
}
