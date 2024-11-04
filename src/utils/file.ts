import { string } from './string'

type splitFileNameAndExtFn = (
  fullFileName: string,
  addDotToExtension?: boolean
) => {
  fileName: string
  extension: string
}

type Unit = 'B' | 'KB' | 'MB' | 'GB' | 'TB'

type IFileObjToBase64Fn = (file: File) => Promise<string | ArrayBuffer | null>

/**
 * Ensure that the Base64 string has the proper data URL scheme prefix.
 * @param {string} base64 - The Base64 string to check and modify.
 * @param {string} mimeType - The MIME type of the file (e.g., 'image/png').
 * @returns {string} - The Base64 string with the correct prefix.
 */
export function ensureBase64Prefix(base64: string, mimeType: string): string {
  const prefix = `data:${mimeType};base64,`

  if (base64.startsWith(prefix)) {
    return base64
  }

  return `${prefix}${base64}`
}

/**
 *
 * @param fullFileName Name of the file with or withnot extension
 * @param addDotToExtension If true, returns extension with '.' Dot prefixed
 * @returns Object containing filname and extension
 */
const splitFileNameAndExt: splitFileNameAndExtFn = (fullFileName, addDotToExtension = false) => {
  const valueToReturn: { fileName: string; extension: string } = {
    fileName: fullFileName,
    extension: ''
  }

  let lastStrSegment: any = valueToReturn.fileName?.split('/')
  lastStrSegment = lastStrSegment?.[lastStrSegment?.length - 1] as any
  const tempFileNameSegments = lastStrSegment?.split('.') ?? []

  valueToReturn.fileName = tempFileNameSegments.slice(0, tempFileNameSegments.length - 1).join('-')
  valueToReturn.extension = tempFileNameSegments[tempFileNameSegments.length - 1] ?? ''

  if (addDotToExtension) valueToReturn.extension = '.' + valueToReturn.extension

  return valueToReturn
}

const fileToBuffer = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)
  return buffer
}

const fileObjToBase64: IFileObjToBase64Fn = async file => {
  return await new Promise(resolve => {
    const reader = new FileReader()
    reader.onloadend = function () {
      resolve(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

function mimeTypeToExtension(mimeType: string): string | undefined {
  const mimeMap: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'application/pdf': 'pdf',
    'text/plain': 'txt',
    'application/zip': 'zip',
    'audio/mpeg': 'mp3',
    'video/mp4': 'mp4'
  }

  return mimeMap[mimeType]
}

const base64ToFile = (dataURI: string) => {
  const byteString = atob(dataURI.split(',')[1])
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new File([new Blob([ab], { type: mimeString })], `abc.${mimeString.split('/').at(-1)}`, {
    type: mimeString
  })
}

const generateUniqueFileName = (file: File) => {
  const uuid = string.generateUniqueId()
  const { extension } = splitFileNameAndExt(file.name)
  return `${uuid}.${extension}`
}

function isVideoFile(filename: string) {
  const videoExtensions = ['.mp4', '.mkv', '.mov', '.avi', '.flv', '.wmv', '.webm']

  // Extract the file extension
  const fileExtension = filename.slice(filename.lastIndexOf('.')).toLowerCase()

  // Check if the file extension is in the list of video extensions
  return videoExtensions.includes(fileExtension)
}

const unitConversionMap: Record<Unit, number> = {
  B: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4
}

function convertValue(value: number, fromUnit: Unit, toUnit: Unit): number {
  const bytes = value * unitConversionMap[fromUnit] // Convert to bytes
  return bytes / unitConversionMap[toUnit] // Convert to the target unit
}

const file = {
  convertValue,
  ensureBase64Prefix,
  mimeTypeToExtension,
  fileToBuffer,
  generateUniqueFileName,
  splitFileNameAndExt,
  fileObjToBase64,
  base64ToFile,
  isVideoFile
}

export { file }
