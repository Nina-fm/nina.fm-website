export const interludeWords = ['interlude', 'intro', 'outro', 'jingle', 'annonce']

export default function isInterlude(track: Track) {
  const regex = new RegExp(interludeWords.join('|'), 'i')
  return regex.test(track.artist ?? '')
}
