/** UI-only shortcut (not saved to DB). */
export const DEPARTURE_SHORTCUT_ADD_ALL = "__departure_add_all__";

export const DEPARTURE_SHORTCUTS = [
  { value: DEPARTURE_SHORTCUT_ADD_ALL, label: "Add All" },
];

const DEPARTURE_SHORTCUT_VALUES = new Set(
  DEPARTURE_SHORTCUTS.map((item) => item.value),
);

/**
 * Expand UI shortcuts into real departure location ids. Shortcut values are
 * never kept in the returned selection (so they are not persisted).
 */
export function resolveDepartureLocationSelection(selected, departureOptions) {
  const selectedArr = selected || [];
  const shortcutHits = selectedArr.filter((value) =>
    DEPARTURE_SHORTCUT_VALUES.has(value),
  );
  const realSelected = selectedArr.filter(
    (value) => !DEPARTURE_SHORTCUT_VALUES.has(value),
  );

  if (shortcutHits.length === 0) {
    return realSelected;
  }

  const idSet = new Set(realSelected.map((id) => Number(id)));

  if (shortcutHits.includes(DEPARTURE_SHORTCUT_ADD_ALL)) {
    (departureOptions || []).forEach((item) => idSet.add(Number(item.id)));
  }

  return (departureOptions || [])
    .filter((item) => idSet.has(Number(item.id)))
    .map((item) => item.id);
}
