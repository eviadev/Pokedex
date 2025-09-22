export const formatHeight = (rawHeight: number) => `${(rawHeight / 10).toFixed(1)} m`;

export const formatWeight = (rawWeight: number) => `${(rawWeight / 10).toFixed(1)} kg`;

export const formatName = (name: string) =>
  name
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
