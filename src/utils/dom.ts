import { ChangeEvent } from 'react'
import { number } from './number'

type IOnNumberTypeFieldChangeOptions = {
  maxLength?: number
}

const isEnterPressed = (event: any) => {
  return event?.key === 'Enter' || event?.keyCode === 13
}

const isWindowPresent = () => {
  return typeof window !== 'undefined'
}

const getNumberFieldValue = (value: number) => {
  return value === 0 ? '' : value.toString()
}

const onNumberTypeFieldChange = (e: ChangeEvent<any>, options?: IOnNumberTypeFieldChangeOptions) => {
  let value: any = e.target.value
  if (options?.maxLength && value?.length > options?.maxLength) {
    value = value.slice(0, options.maxLength)
  }
  value = number.convertToNumber(value)
  value = getNumberFieldValue(value)
  e.target.value = value
}

const onNumberTypeFieldChangeWithoutE = (value: any, options?: IOnNumberTypeFieldChangeOptions) => {
  value = value.replace(/[^0-9]/g, '')
  if (options?.maxLength && value?.length > options?.maxLength) {
    value = value.slice(0, options.maxLength)
  }
  value = number.convertToNumber(value)
  value = getNumberFieldValue(value)
  return value
}

const dom = {
  onNumberTypeFieldChangeWithoutE,
  onNumberTypeFieldChange,
  getNumberFieldValue,
  isEnterPressed,
  isWindowPresent
}

export { dom }
