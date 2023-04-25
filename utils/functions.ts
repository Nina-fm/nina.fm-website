import { DateTime } from "luxon"

export const parseAirTimeDate = (date: string) => DateTime.fromFormat(date.replace(/\.\d+$/, ""), "yyyy-MM-dd HH:mm:ss")

export const convertImageToBase64 = async (imgUrl: string): Promise<string> =>
  new Promise((resolve) => {
    const image = new Image()
    image.crossOrigin = "anonymous"
    image.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      canvas.height = image.naturalHeight
      canvas.width = image.naturalWidth
      ctx?.drawImage(image, 0, 0)
      const dataUrl = canvas.toDataURL()
      resolve(dataUrl)
    }
    image.src = imgUrl
  })
