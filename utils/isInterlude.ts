export const interludeWords = ['interlude', 'introlude', 'outrolude', 'outlude', 'intro', 'outro', 'jingle', 'annonce']

export default function isInterlude(track: Track) {
  if (!track.title) return false

  return interludeWords.includes(track.title.toLowerCase())
}
