export function convertToNumber(value: any): number {
  const parsedValue = parseFloat(value)
  return isNaN(parsedValue) ? 0 : parsedValue
}

const number = {
  convertToNumber
}

export { number }
