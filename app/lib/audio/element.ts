/** HTMLMediaElement.networkState code names */
export const networkStatusCodes = ['NETWORK_EMPTY', 'NETWORK_IDLE', 'NETWORK_LOADING', 'NETWORK_NO_SOURCE']

/** HTMLMediaElement.networkState human-readable descriptions */
export const networkStatusTexts = [
  'There is no data yet. Also, readyState is HAVE_NOTHING.',
  'HTMLMediaElement is active and has selected a resource, but is not using the network.',
  'The browser is downloading HTMLMediaElement data.',
  'No HTMLMediaElement src found.',
]

/** HTMLMediaElement.readyState code names */
export const readyStatusCodes = [
  'HAVE_NOTHING',
  'HAVE_METADATA',
  'HAVE_CURRENT_DATA',
  'HAVE_FUTURE_DATA',
  'HAVE_ENOUGH_DATA',
]

/** HTMLMediaElement.readyState human-readable descriptions */
export const readyStatusTexts = [
  'No information is available about the media resource.',
  'Enough of the media resource has been retrieved that the metadata attributes are initialized. Seeking will no longer raise an exception.',
  'Data is available for the current playback position, but not enough to actually play more than one frame.',
  'Data for the current playback position as well as for at least a little bit of time into the future is available.',
  'Enough data is available—and the download rate is high enough—that the media can be played through to the end without interruption.',
]

/** Default state values for an HTMLAudioElement wrapper */
export const defaultAudioElementState = {
  buffered: 0,
  currentTime: 0,
  duration: 0,
  ended: false,
  error: null,
  muted: false,
  networkState: 0,
  paused: true,
  playbackRate: 1,
  played: 0,
  preload: 'auto' as const,
  readyState: 0,
  volume: 1,
  stalled: false,
  waiting: false,
}
