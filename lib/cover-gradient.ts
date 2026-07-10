/**
 * Deterministic on-brand gradient keyed off a string, used wherever cover
 * artwork might be missing (article covers, album art, journey photos) so
 * nothing ever looks empty. The one place raw brand colors are allowed —
 * it is intentional artwork, not chrome. Theme-independent by design.
 */

/** Tiny deterministic string hash → unsigned 32-bit int. */
export function hashSlug(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Brand-palette gradient derived from the key. */
export function gradientFor(slug: string): string {
  const h = hashSlug(slug);
  const angle = h % 360;
  // Two anchor positions for the radial accents, stable per key.
  const x1 = 15 + (h % 40);
  const y1 = 10 + ((h >> 3) % 35);
  const x2 = 60 + ((h >> 6) % 35);
  const y2 = 55 + ((h >> 9) % 35);
  return [
    `radial-gradient(60% 60% at ${x1}% ${y1}%, rgba(232, 84, 26, 0.55), transparent 70%)`,
    `radial-gradient(55% 65% at ${x2}% ${y2}%, rgba(26, 58, 143, 0.6), transparent 70%)`,
    `linear-gradient(${angle}deg, #0e1320, #080b14)`,
  ].join(", ");
}
