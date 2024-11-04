import { CONST } from '@/constants'
import { ErrorHandlingService } from '@/services/ErrorHandling.service'
import { sign, verify, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken'

const generateToken = (payload: Record<any, any>, expiresIn: string | number = '30d') => {
  const secret = process.env.JWT_SECRET ?? ''
  return sign(payload, secret, { expiresIn })
}

const verifyToken = (token: string) => {
  try {
    const secret = process.env.JWT_SECRET ?? ''
    const decoded = verify(token, secret)
    return decoded
  } catch (error: any) {
    let message = error.message

    switch (true) {
      case error instanceof TokenExpiredError:
        message = CONST.RESPONSE_MESSAGES.TOKEN_INVALID_OR_EXPIRED
        break

      case error instanceof JsonWebTokenError:
        message = CONST.RESPONSE_MESSAGES.TOKEN_INVALID_OR_EXPIRED
        break
    }

    throw ErrorHandlingService.badRequest({
      message,
      data: {
        token
      }
    })
  }
}

const jwt = {
  generateToken,
  verifyToken
}

export { jwt }
