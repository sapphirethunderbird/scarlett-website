import type { CuratedTrack } from "./tracks";

/**
 * Server-side lookup against the iTunes Search API (no key, no CORS for
 * browsers — so this must run in an RSC). One batched request resolves the
 * whole shelf. Preview URLs live on Apple's CDN and rotate, so the caller
 * caches via ISR (revalidate) rather than baking them in at build forever.
 */

export interface ResolvedTrack extends CuratedTrack {
  albumName: string | null;
  releaseYear: string | null;
  /** 600×600 artwork on Apple's CDN. */
  artworkUrl: string | null;
  /** ~30s AAC preview. */
  previewUrl: string | null;
  durationMs: number | null;
}

interface ItunesLookupResult {
  wrapperType?: string;
  trackId?: number;
  collectionName?: string;
  releaseDate?: string;
  artworkUrl100?: string;
  previewUrl?: string;
  trackTimeMillis?: number;
}

/** Bare fallback so the page still renders if Apple is unreachable. */
function unresolved(track: CuratedTrack): ResolvedTrack {
  return {
    ...track,
    albumName: null,
    releaseYear: null,
    artworkUrl: null,
    previewUrl: null,
    durationMs: null,
  };
}

export async function resolveTracks(
  tracks: CuratedTrack[],
): Promise<ResolvedTrack[]> {
  if (tracks.length === 0) return [];
  const ids = tracks.map((t) => t.itunesId).join(",");

  try {
    const res = await fetch(
      `https://itunes.apple.com/lookup?id=${ids}&entity=song&country=US`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) throw new Error(`iTunes lookup failed: ${res.status}`);
    const data = (await res.json()) as { results?: ItunesLookupResult[] };

    const byId = new Map<number, ItunesLookupResult>();
    for (const r of data.results ?? []) {
      if (r.wrapperType === "track" && typeof r.trackId === "number") {
        byId.set(r.trackId, r);
      }
    }

    return tracks.map((t) => {
      const r = byId.get(t.itunesId);
      if (!r) return unresolved(t);
      return {
        ...t,
        albumName: r.collectionName ?? null,
        releaseYear: r.releaseDate?.slice(0, 4) ?? null,
        artworkUrl: r.artworkUrl100?.replace("100x100", "600x600") ?? null,
        previewUrl: r.previewUrl ?? null,
        durationMs: r.trackTimeMillis ?? null,
      };
    });
  } catch {
    // Whole-API failure: render the shelf from curated fallbacks, never 500.
    return tracks.map(unresolved);
  }
}
