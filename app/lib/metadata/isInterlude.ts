export const interludeWords = ['interlude', 'introlude', 'outrolude', 'outlude', 'intro', 'outro', 'jingle', 'annonce']

export function isInterlude(track: { artist: string | null }): boolean {
  if (!track.artist) return false
  return interludeWords.includes(track.artist.toLowerCase())
}
