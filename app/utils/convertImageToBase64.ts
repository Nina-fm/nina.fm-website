export default async function convertImageToBase64(imgUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'

    image.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Cannot get canvas context'))
          return
        }
        canvas.height = image.naturalHeight
        canvas.width = image.naturalWidth
        ctx.drawImage(image, 0, 0)
        const dataUrl = canvas.toDataURL()
        resolve(dataUrl)
      } catch (error) {
        reject(error)
      }
    }

    image.onerror = () => {
      reject(new Error(`Failed to load image: ${imgUrl}`))
    }

    image.src = imgUrl
  })
}
