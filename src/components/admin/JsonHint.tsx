/** @deprecated Prefer LocalizedTextFields — kept for stringify helpers if needed. */
export function stringifyJson(value: unknown) {
  return JSON.stringify(value ?? {}, null, 2);
}
