/** Required fields for POST/PUT /api/assets/boats (AssetsController validation). */
export const BOAT_REQUIRED_FIELD_KEYS = new Set([
  "name",
  "make",
  "shade",
  "ac",
  "type_id",
  "length",
  "location_id",
  "asset_marina_location_id",
  "capacity",
  "access_id",
]);

export { RequiredFieldsLegend, RequiredMark } from "./assetFormUi";
