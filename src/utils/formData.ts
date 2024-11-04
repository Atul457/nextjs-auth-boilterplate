type IFormDataToJson = {
  formData: FormData
}

const formDataToJson = (args: IFormDataToJson) => {
  const { formData } = args
  const json: Record<string, any> = {}

  formData.forEach((value, key) => {
    if (key.endsWith('[]')) {
      const rootKey = key.slice(0, -2)
      if (!json[rootKey]) {
        json[rootKey] = []
      }
      json[rootKey].push(value)
    } else if (key.endsWith(']')) {
      const rootKey = key.slice(0, -3)
      if (!json[rootKey]) {
        json[rootKey] = []
      }
      json[rootKey].push(value)
    } else {
      if (value instanceof File) {
        json[key] = value
      } else {
        try {
          const parsedValue = JSON.parse(value as string)
          json[key] = parsedValue
        } catch (error) {
          json[key] = value
        }
      }
    }
  })

  return json
}

const formData = {
  formDataToJson
}

export { formData }
