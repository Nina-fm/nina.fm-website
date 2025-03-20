export const interludeWords = ["interlude", "intro", "outro"]

export default function isInterlude(track: Track) {
  const regex = new RegExp(interludeWords.join("|"), "i")
  return regex.test(track.artist ?? "")
}
