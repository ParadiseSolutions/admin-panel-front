/** Required fields for POST/PUT /api/assets/vehicle (AssetsController validation). */
export const VEHICLE_REQUIRED_FIELD_KEYS = new Set([
  "asset_id",
  "type_id",
  "make",
  "transmision_id",
  "quantity",
  "location_id",
  "ac",
  "capacity",
  "max_cap",
]);

export { RequiredFieldsLegend, RequiredMark } from "./assetFormUi";
