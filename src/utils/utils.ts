import { CONST } from '@/constants'
import { file } from './file'
import { rgbaToHex } from './rgbaToHex'
import { string } from './string'
import { toast } from './toast'
import { error } from './error'
import { errorHandler } from './errorHandler'
import { generateRes } from './generateRes'
import { getReqBody } from './getReqBody'
import { bcrypt } from './bcrypt'
import { jwt } from './jwt'
import { formData } from './formData'
import { json } from './json'
import { helpers } from './helpers'
import { date } from './date'
import { dom } from './dom'
import { number } from './number'

export const utils = {
  number,
  errorHandler,
  bcrypt,
  date,
  helpers,
  dom,
  json,
  jwt,
  formData,
  generateRes,
  getReqBody,
  file,
  string,
  rgbaToHex,
  CONST,
  error,
  toast
}
