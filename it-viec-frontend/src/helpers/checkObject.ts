export function isObjectEmpty(obj: object): boolean {
  return !!(obj && typeof obj === "object" && Object.keys(obj).length === 0);
}