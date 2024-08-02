export function toFixed<T extends number | null>(value: T, decimals: number = 2): T {
  if (value == null) return null as T;
  return parseFloat(value.toFixed(decimals)) as T;
}
