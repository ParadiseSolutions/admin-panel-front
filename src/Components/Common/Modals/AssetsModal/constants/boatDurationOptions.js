export const DURATION_OPTIONS = [
  { value: "4 Hours", label: "4 Hours" },
  { value: "6 Hours", label: "6 Hours" },
  { value: "8 Hours", label: "8 Hours" },
  { value: "10 Hours", label: "10 Hours" },
  { value: "12 Hours", label: "12 Hours" },
  { value: "All Trips", label: "All Trips" },
];

export const normalizeDurationValues = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};
