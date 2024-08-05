export function toFixed<T extends number | null>(value: T, decimals: number = 2): T {
  if (value == null) return null as T;
  return parseFloat(value.toFixed(decimals)) as T;
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
