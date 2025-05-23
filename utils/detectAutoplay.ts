const AUDIO =
  typeof window !== 'undefined' && typeof document !== 'undefined'
    ? new Blob(
        [
          new Uint8Array([
            255, 227, 24, 196, 0, 0, 0, 3, 72, 1, 64, 0, 0, 4, 132, 16, 31, 227, 192, 225, 76, 255, 67, 12, 255, 221,
            27, 255, 228, 97, 73, 63, 255, 195, 131, 69, 192, 232, 223, 255, 255, 207, 102, 239, 255, 255, 255, 101,
            158, 206, 70, 20, 59, 255, 254, 95, 70, 149, 66, 4, 16, 128, 0, 2, 2, 32, 240, 138, 255, 36, 106, 183, 255,
            227, 24, 196, 59, 11, 34, 62, 80, 49, 135, 40, 0, 253, 29, 191, 209, 200, 141, 71, 7, 255, 252, 152, 74, 15,
            130, 33, 185, 6, 63, 255, 252, 195, 70, 203, 86, 53, 15, 255, 255, 247, 103, 76, 121, 64, 32, 47, 255, 34,
            227, 194, 209, 138, 76, 65, 77, 69, 51, 46, 57, 55, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 255,
            227, 24, 196, 73, 13, 153, 210, 100, 81, 135, 56, 0, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170,
            170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170,
            170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170,
            170, 170, 170, 170, 170, 170,
          ]),
        ],
        { type: 'audio/mpeg' },
      )
    : null

let canplay = false
export function forceDetectAutoplay(timeout?: number): Promise<boolean> {
  return new Promise(function (r) {
    const video = document.createElement('video')
    video.src = URL.createObjectURL(AUDIO!)
    video.playsInline = true
    const ret = video.play()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timer: any

    const end = function (can: boolean) {
      clearTimeout(timer)
      canplay = can
      video.pause()
      URL.revokeObjectURL(video.src)
      video.src = ''
      video.srcObject = null
      if (video.remove) video.remove()
      r(can)
    }

    if (ret) {
      ret
        .then(function () {
          end(true)
        })
        .catch(function () {
          end(false)
        })
      timer = setTimeout(
        function () {
          end(false)
        },
        timeout == null ? 300 : timeout,
      )
    } else {
      end(true)
    }
  })
}

export function detectAutoplay(timeout?: number): Promise<boolean> {
  if (canplay) return Promise.resolve(canplay)
  return forceDetectAutoplay(timeout)
}

export default detectAutoplay
