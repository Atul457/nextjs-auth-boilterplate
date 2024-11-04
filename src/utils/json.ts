const isJson = (json: any) => {
  try {
    JSON.parse(json)
    return true
  } catch (error) {
    return false
  }
}

const getParsedJson = (stringifiedJson: any): Record<string, any> => {
  if (stringifiedJson && isJson(stringifiedJson)) {
    return JSON.parse(stringifiedJson)
  }

  return {}
}

/**
/**
 * Convert JSON object to FormData
 * @param json JSON object to convert
 * @returns FormData object
 */
function jsonToFormData(json: Record<string, any>): FormData {
  const formData = new FormData()

  function appendFormData(data: any, rootName: string | null = null) {
    if (Array.isArray(data)) {
      data.forEach((value, index) => {
        appendFormData(value, `${rootName}[${index}]`)
      })
    } else if (typeof data === 'object' && data !== null && !(data instanceof File) && !(data instanceof Date)) {
      Object.keys(data).forEach(key => {
        if (rootName) {
          appendFormData(data[key], `${rootName}.${key}`)
        } else {
          appendFormData(data[key], key)
        }
      })
    } else {
      if (data instanceof File) {
        formData.append(rootName!, data, data.name)
      } else if (data instanceof Date) {
        formData.append(rootName!, data.toISOString())
      } else if (data !== undefined) {
        formData.append(rootName!, data)
      }
    }
  }

  appendFormData(json)

  return formData
}

const json = {
  isJson,
  getParsedJson,
  jsonToFormData
}

export { json }
