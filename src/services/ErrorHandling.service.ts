import { CONST } from '@/constants'

type IErrorHandlerServiceArgs =
  | undefined
  | null
  | {
      message?: string
      data?: ErrorHandlingService['data']
      status?: number
    }

const { RESPONSE_MESSAGES, HTTP_RESPONSE_CODE } = CONST

/**
 * @info Error Handler is a service that can be used to throw exceptions
 */
class ErrorHandlingService {
  public status = 500
  public data: Record<string, any> | null = null
  public message = 'Something went wrong'

  constructor(status: number, message: string, data: ErrorHandlingService['data']) {
    this.status = status
    this.message = message
    this.data = data
  }

  static userAlreadyExists(args?: IErrorHandlerServiceArgs) {
    let { message, status, data = null } = args ?? {}
    message = message ?? RESPONSE_MESSAGES.USER_ALREADY_EXIST
    status = status ?? HTTP_RESPONSE_CODE.BAD_REQUEST
    return new ErrorHandlingService(status, message, data)
  }

  static userNotFound(args?: IErrorHandlerServiceArgs) {
    let { message, status, data = null } = args ?? {}
    message = message ?? RESPONSE_MESSAGES.USER_NOT_EXISTS
    status = status ?? HTTP_RESPONSE_CODE.NOT_FOUND
    return new ErrorHandlingService(status, message, data)
  }

  static forbidden(args?: IErrorHandlerServiceArgs) {
    let { message, status, data = null } = args ?? {}
    message = message ?? RESPONSE_MESSAGES.FORBIDDEN
    status = status ?? HTTP_RESPONSE_CODE.FORBIDDEN
    return new ErrorHandlingService(status, message, data)
  }

  static notFound(args?: IErrorHandlerServiceArgs) {
    let { message, status, data = null } = args ?? {}
    message = message ?? RESPONSE_MESSAGES.NOT_FOUND
    status = status ?? HTTP_RESPONSE_CODE.NOT_FOUND
    return new ErrorHandlingService(status, message, data)
  }

  static conflict(args?: IErrorHandlerServiceArgs) {
    let { message, status, data = null } = args ?? {}
    message = message ?? RESPONSE_MESSAGES.CONFLICT
    status = status ?? HTTP_RESPONSE_CODE.CONFLICT
    return new ErrorHandlingService(status, message, data)
  }

  static badRequest(args?: IErrorHandlerServiceArgs) {
    let { message, status, data = null } = args ?? {}
    message = message ?? RESPONSE_MESSAGES.BAD_REQUEST
    status = status ?? HTTP_RESPONSE_CODE.BAD_REQUEST
    return new ErrorHandlingService(status, message, data)
  }

  static somethingWentWrong(args?: IErrorHandlerServiceArgs) {
    let { message, status, data = null } = args ?? {}
    message = message ?? RESPONSE_MESSAGES.SOMETHING_WENT_WRONG
    status = status ?? HTTP_RESPONSE_CODE.INTERNAL_SERVER_ERROR
    return new ErrorHandlingService(status, message, data)
  }

  static unAuthorized(args?: IErrorHandlerServiceArgs) {
    let { message, status, data = null } = args ?? {}
    message = message ?? RESPONSE_MESSAGES.UN_AUTHORIZED
    status = status ?? HTTP_RESPONSE_CODE.UNAUTHORIZED
    return new ErrorHandlingService(status, message, data)
  }
}

export { ErrorHandlingService }
