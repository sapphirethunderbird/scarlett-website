/**
 * The curated shelf — the ONLY file to edit when adding or reordering songs.
 *
 * `itunesId` is Apple's stable trackId; find one with:
 *   https://itunes.apple.com/search?term=ARTIST+TITLE&entity=song&limit=5
 * Title/artist here are fallbacks if the lookup ever fails, so keep them true.
 *
 * `note` is optional — a one-liner shown under the flow ("why this song").
 */

export interface CuratedTrack {
  /** Apple trackId — the stable lookup key. */
  itunesId: number;
  title: string;
  artist: string;
  /** One-liner shown in the LCD — why this song is on the shelf. */
  note?: string;
}

export const TRACKS: CuratedTrack[] = [
  {
    itunesId: 1754263837,
    title: "Value",
    artist: "Ado",
  },
  {
    itunesId: 266390192,
    title: "The House Is Rockin'",
    artist: "Stevie Ray Vaughan & Double Trouble",
  },
  {
    itunesId: 1065973711,
    title: "Brain Damage",
    artist: "Pink Floyd",
  },
  {
    itunesId: 158642243,
    title: "Don't Look Back",
    artist: "Boston",
  },
  {
    itunesId: 319402886,
    title: "Dreams",
    artist: "Van Halen",
  },
  {
    itunesId: 1822843348,
    title: "The End",
    artist: "Mammoth",
  },
  {
    itunesId: 635788975,
    title: "I Can't Tell You Why",
    artist: "Eagles",
  },
  {
    itunesId: 1440934553,
    title: "All Night to Get There",
    artist: "Rascal Flatts",
  },
  {
    itunesId: 1529543509,
    title: "BEAUTIFUL WORLD",
    artist: "LiSA",
  },
  {
    itunesId: 580708940,
    title: "Good Times Bad Times",
    artist: "Led Zeppelin",
  },
  {
    itunesId: 1217902078,
    title: "Seven Wonders",
    artist: "Fleetwood Mac",
  },
  {
    itunesId: 532975790,
    title: "Shining Star",
    artist: "Earth, Wind & Fire",
  },
];
