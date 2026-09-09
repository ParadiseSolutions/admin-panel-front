/** UI-only shortcuts (not saved to DB). */
export const DEPARTURE_SHORTCUT_ADD_ALL = "__departure_add_all__";
export const DEPARTURE_SHORTCUT_NORTH_ZONE = "__departure_north_zone__";
export const DEPARTURE_SHORTCUT_DOWNTOWN = "__departure_downtown__";
export const DEPARTURE_SHORTCUT_SOUTH_ZONE = "__departure_south_zone__";

export const DEPARTURE_SHORTCUTS = [
  { value: DEPARTURE_SHORTCUT_ADD_ALL, label: "Add All" },
  { value: DEPARTURE_SHORTCUT_NORTH_ZONE, label: "North Zone Piers" },
  { value: DEPARTURE_SHORTCUT_DOWNTOWN, label: "Downtown Piers" },
  { value: DEPARTURE_SHORTCUT_SOUTH_ZONE, label: "South Zone Piers" },
];

const DEPARTURE_SHORTCUT_VALUES = new Set(
  DEPARTURE_SHORTCUTS.map((item) => item.value),
);

const formatLocationType = (locationType) => {
  switch (locationType) {
    case "hotel_pier":
      return "Hotel Pier";
    case "marina":
      return "Marina";
    case "beach":
      return "Beach";
    case "dock":
      return "Public Pier";
    case "zone_group":
      return "Zone Group";
    default:
      return locationType
        ? locationType.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "";
  }
};

export const groupDepartureLocationOptions = (departureOptions = []) => {
  const selectableOptions = (departureOptions || []).filter(
    (item) => Number(item.is_zone_group) !== 1,
  );
  const groups = {};
  selectableOptions.forEach((item) => {
    const key = item.zone_label || "Other";
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  });

  return Object.keys(groups)
    .sort((a, b) => {
      if (a === "Other") return 1;
      if (b === "Other") return -1;
      return a.localeCompare(b);
    })
    .map((label) => ({
      label,
      options: groups[label]
        .slice()
        .sort(
          (a, b) =>
            (a.sort_order || 0) - (b.sort_order || 0) ||
            String(a.name).localeCompare(String(b.name)),
        )
        .map((item) => ({
          ...item,
          type_label: formatLocationType(item.location_type),
        })),
    }));
};

const expandZoneGroup = (departureOptions, zoneGroupRow) => {
  const zones =
    zoneGroupRow.zone === "south_zone"
      ? ["south_zone", "deep_south"]
      : [zoneGroupRow.zone];

  return (departureOptions || []).filter(
    (item) =>
      Number(item.location_id) === Number(zoneGroupRow.location_id) &&
      Number(item.is_zone_group) !== 1 &&
      Number(item.active ?? 1) === 1 &&
      zones.includes(item.zone),
  );
};

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
    (departureOptions || [])
      .filter((item) => Number(item.is_zone_group) !== 1)
      .forEach((item) => idSet.add(Number(item.id)));
  }

  const zoneShortcutMap = {
    [DEPARTURE_SHORTCUT_NORTH_ZONE]: "north_zone",
    [DEPARTURE_SHORTCUT_DOWNTOWN]: "downtown",
    [DEPARTURE_SHORTCUT_SOUTH_ZONE]: "south_zone",
  };

  shortcutHits.forEach((shortcut) => {
    const zone = zoneShortcutMap[shortcut];
    if (!zone) {
      return;
    }

    const zoneGroupRow = (departureOptions || []).find(
      (item) =>
        Number(item.is_zone_group) === 1 &&
        item.zone === zone &&
        (shortcut !== DEPARTURE_SHORTCUT_SOUTH_ZONE || item.zone === "south_zone"),
    );

    if (zoneGroupRow) {
      expandZoneGroup(departureOptions, zoneGroupRow).forEach((item) =>
        idSet.add(Number(item.id)),
      );
      return;
    }

    const zones = zone === "south_zone" ? ["south_zone", "deep_south"] : [zone];
    (departureOptions || [])
      .filter(
        (item) =>
          Number(item.is_zone_group) !== 1 &&
          zones.includes(item.zone),
      )
      .forEach((item) => idSet.add(Number(item.id)));
  });

  return (departureOptions || [])
    .filter(
      (item) =>
        Number(item.is_zone_group) !== 1 && idSet.has(Number(item.id)),
    )
    .map((item) => item.id);
}
