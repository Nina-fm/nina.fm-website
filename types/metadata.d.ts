declare global {
  interface TrackBase {
    artist: string | null;
    title: string | null;
    [key: string]: unknown;
  }
  interface Track extends TrackBase {
    id: number;
    position: number;
    start_at: number;
  }
}
export {};
