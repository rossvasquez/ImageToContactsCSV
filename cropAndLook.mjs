import { createWorker } from 'tesseract.js'
import sharp from 'sharp'

async function cropAndRecognizeImage(imagePath, cropOptions) {
    const worker = await createWorker('eng')

  try {
    const croppedBuffer = await sharp(imagePath)
      .extract(cropOptions)
      .toBuffer()

    const ret = await worker.recognize(croppedBuffer)

    await worker.terminate()

    return ret.data.text;
  } catch (error) {
    console.error('Error in cropAndRecognizeImage:', error)
    await worker.terminate()
    throw error
  }
}

export { cropAndRecognizeImage };