import { ICapitalize } from './types'

// Returns initials from string
const getInitials = (string: string) =>
  string.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')

const ensurePrefix = (str: string, prefix: string) => (str.startsWith(prefix) ? str : `${prefix}${str}`)

const withoutSuffix = (str: string, suffix: string) => (str.endsWith(suffix) ? str.slice(0, -suffix.length) : str)

const withoutPrefix = (str: string, prefix: string) => (str.startsWith(prefix) ? str.slice(prefix.length) : str)

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
/**
 * Capitalizes a string according to the provided options.
 *
 * @param args - The configuration options.
 * @param valueToCapitalize - The value to capitalize
 * @returns The capitalized string or the specified fallback value.
 *
 * In default value for `capitalizeAll` is `true`
 * If `valueToCapitalize` is not a string, the function returns `args.returnValueIfNotString`
 * if it's provided; otherwise, it returns an empty string. If `args.capitalizeAll` is `true`,
 * all letters in the string are capitalized; otherwise, only the first letter is capitalized.
 * if `args.fullyCapitalize` is `true` then all the letters of the passed string would be capitalized.
 */
const capitalize: ICapitalize = (valueToCapitalize = '', args) => {
  let splittedString: string[] = []
  let { returnValueIfNotString, capitalizeAll = true, fullyCapitalize = false } = args ?? {}

  if (typeof valueToCapitalize !== 'string') {
    if (returnValueIfNotString) return returnValueIfNotString
    else return ''
  }

  splittedString = valueToCapitalize?.split(' ')

  if (capitalizeAll)
    splittedString = splittedString.map(currChunk => {
      return currChunk.length ? `${currChunk.substring(0, 1).toUpperCase()}${currChunk.substring(1)}` : currChunk
    })
  else if (splittedString?.[0])
    splittedString[0] = splittedString[0].length
      ? `${splittedString[0].substring(0, 1).toUpperCase()}${splittedString[0].substring(1)}`
      : splittedString[0].toUpperCase()

  return fullyCapitalize ? splittedString.join(' ')?.toUpperCase() : splittedString.join(' ')
}

function generateUniqueId(length = 36) {
  // Function to generate a random 4-character hex string
  const randomHex = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)

  // Get the current timestamp in milliseconds
  const timestamp = Date.now().toString(16)

  // Generate a base pattern using the timestamp and random hex values
  let base = randomHex() + randomHex() + timestamp + randomHex() + randomHex()

  // Remove hyphens and adjust the length
  base = base.replace(/-/g, '').substring(0, length)

  // Insert hyphens back at the appropriate positions for standard UUID length
  if (length > 8 && length <= 36) {
    base =
      base.slice(0, 8) +
      '-' +
      base.slice(8, 12) +
      '-' +
      base.slice(12, 16) +
      '-' +
      base.slice(16, 20) +
      '-' +
      base.slice(20, length + 4)
  }

  return base.substring(0, length)
}

/**
 * Removes any non-numeric characters from a given value, except for the decimal point.
 *
 * @param value - The value to remove non-numeric characters from.
 * @returns The cleaned value with only numeric characters and a maximum of one decimal point.
 */
function removeNonNumeric(value: any): string {
  // Remove any non-numeric characters except for the decimal point
  let valueToReturn = '0'
  const cleanedValue = value.replace(/[^0-9.]/g, '')

  // Ensure only one decimal point is allowed
  const parts = cleanedValue.split('.')

  if (parts.length >= 2) {
    // If there are multiple decimal points, keep only the first one
    valueToReturn = `${Number(parts[0])}.${parts.slice(1).join('')}`
  } else if (parts.length === 1) {
    valueToReturn = Number(parts[0]).toString()
  }

  return valueToReturn
}

export const string = {
  getInitials,
  ensurePrefix,
  removeNonNumeric,
  generateUniqueId,
  withoutSuffix,
  withoutPrefix,
  capitalize
}
