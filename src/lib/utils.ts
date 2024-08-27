export function toFixed(value: null | undefined, decimals?: number): null;
export function toFixed(value: number | string, decimals?: number): number;
export function toFixed(
  value: number | string | null | undefined,
  decimals: number = 2,
): number | null {
  if (value == null) return null;
  if (typeof value === "string") return toFixed(parseFloat(value), decimals);
  return parseFloat(value.toFixed(decimals));
}

export function downloadResponse(responseBlob: Blob, mimeType: string, filename: string) {
  const blob = new Blob([responseBlob], { type: mimeType });
  const link = window.URL.createObjectURL(blob);
  const aTag = document.createElement("a");
  aTag.setAttribute("style", "display:none");
  aTag.setAttribute("href", link);
  aTag.setAttribute("download", filename);
  aTag.target = "_blank";
  aTag.rel = "noopener noreferrer";
  document.body.appendChild(aTag);
  aTag.click();
  window.URL.revokeObjectURL(link);
  document.body.removeChild(aTag);
}
