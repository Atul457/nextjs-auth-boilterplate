import * as yup from 'yup'

import { generateRes } from './generateRes'
import { string } from './string'
import { ErrorHandlingService } from '@/services/ErrorHandling.service'
import { CONST } from '@/constants'

const CONSTANT = CONST

/**
 * @info Handles errors thrown and sends a convenient message to client
 */
const errorHandler = async (function_: Function) => {
  let response: any
  try {
    response = await function_()
  } catch (error: any) {
    let isServerError = false
    let unhandeledError = false

    // const uss = services.server.UserSessionService

    const response = {
      message: CONSTANT.RESPONSE_MESSAGES.SOMETHING_WENT_WRONG,
      status: CONSTANT.HTTP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      data: null as Record<string, any> | null
    }

    if (error instanceof ErrorHandlingService) {
      isServerError = CONSTANT.HTTP_RESPONSE_CODE.INTERNAL_SERVER_ERROR === error.status

      response.message = error.message
      response.status = error.status
      response.data = error.data

      if (isServerError) {
        response.message = CONSTANT.RESPONSE_MESSAGES.SOMETHING_WENT_WRONG
      }
    } else if (error instanceof yup.ValidationError) {
      response.message = error.message
      response.status = CONSTANT.HTTP_RESPONSE_CODE.BAD_REQUEST
    } else {
      unhandeledError = true
    }

    if (isServerError || unhandeledError) {
      console.error(error)
    }

    return Response.json(
      generateRes({
        ...response,
        message:
          typeof response.message === 'string'
            ? string.capitalize(response.message, {
                capitalizeAll: false
              })
            : response.message,
        status: false
      }),
      {
        status: response.status,
        statusText:
          typeof response.message === 'string'
            ? string.capitalize(response.message, {
                capitalizeAll: false
              })
            : response.message
      }
    )
  }

  return response
}

export { errorHandler }
