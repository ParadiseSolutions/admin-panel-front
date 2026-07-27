/** Required fields for POST/PUT /api/assets/others (AssetsController validation). */
export const OTHERS_REQUIRED_FIELD_KEYS = new Set([
  "asset_id",
  "category_id",
  "quantity",
  "location_id",
  "max_cap",
  "cap_ea",
]);

export { RequiredFieldsLegend, RequiredMark } from "./assetFormUi";
