import { ErrorHandlingService } from '@/services/ErrorHandling.service'

const getReqBody = async (
  request: Request,
  options?: {
    formData?: boolean
  }
): Promise<FormData | Record<any, any>> => {
  return new Promise(async (resolve, reject) => {
    if (options?.formData) {
      try {
        const formData = await request.formData()
        resolve(formData)
        return
      } catch (error) {
        console.error(error)
        reject(
          ErrorHandlingService.badRequest({
            message: 'No data sent'
          })
        )
      }
    } else {
      try {
        const body = await request.json()
        resolve(body ?? {})
      } catch (error) {
        resolve({})
      }
    }
  })
}

export { getReqBody }
