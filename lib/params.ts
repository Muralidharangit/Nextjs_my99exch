/* Next.js passes searchParams as string | string[]; pages use the first value */
export type SearchParams = Promise<Record<string, string | string[] | undefined>>;
export const param = (sp: Record<string, string | string[] | undefined>, k: string): string | null => {
  const v = sp[k];
  return Array.isArray(v) ? v[0] ?? null : v ?? null;
};

/** history.replaceState with updated query params, keeping the current path and hash */
export function replaceQuery(update: (u: URL) => void) {
  const u = new URL(window.location.href);
  update(u);
  window.history.replaceState(window.history.state, '', u);
}

/** own-key lookup, so ?id=__proto__ or ?id=constructor never matches a record */
export const has = (obj: object, k: string | null): k is string => k !== null && Object.prototype.hasOwnProperty.call(obj, k);
