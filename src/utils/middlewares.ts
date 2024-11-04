import UserModel, { IUser as IUserModel } from '@/models/user.model'
import { ErrorHandlingService } from '@/services/ErrorHandling.service'
import mongoose from 'mongoose'
import { IUser } from '../../next-auth'
import { services } from '@/services/index.service'
import { IUserSession } from '@/models/userSession.model'
import { CONST } from '@/constants'
import { jwt } from './jwt'

/**
 * Interface representing the user details.
 */
type IUserDetails = {
  id: IUser['id']
  type: IUser['type']
  iat: number
  exp: number
}

/**
 * Interface representing the options for withUser middleware.
 */
type IWithUserOptions = Partial<{
  withAdmin: boolean
  withIndividual: boolean
  withCorporateEmployer: boolean
  withGovtOrganization: boolean
  withThirdPartyAdministrator: boolean
  select?: (keyof IUserModel)[]
}>

/**
 * Authenticates the user based on the request.
 * @param request - The request object.
 * @returns The user details along with the token.
 * @throws {Error} If the authorization header is missing or the session is not found.
 */
const auth = async (request: Request): Promise<[IUser & { token: string }, IUserSession]> => {
  try {
    let token: string = ''
    const uss = services.server.UserSessionService
    const authorization = request.headers.get('authorization') ?? ''
    const tokenParts = authorization.split(' ')
    let userDetails: IUserDetails | null = null

    let bearerTokenSent = tokenParts.length === 2 && tokenParts[0] === 'Bearer'

    if (bearerTokenSent) {
      token = tokenParts[1]
      userDetails = jwt.verifyToken(token) as IUserDetails
    } else {
      throw ErrorHandlingService.badRequest({
        message: CONST.RESPONSE_MESSAGES.MISSING_AUTH_HEADER
      })
    }

    let session = await uss.findSessionByToken(token)

    if (!session) {
      throw ErrorHandlingService.badRequest({
        message: CONST.RESPONSE_MESSAGES.TOKEN_INVALID_OR_EXPIRED,
        data: {
          logout: true
        }
      })
    }

    session = await uss.updateSessionByToken(token, {
      lastLogin: new Date()
    })

    return [{ ...userDetails, token }, session!]
  } catch (error) {
    if (error instanceof ErrorHandlingService) {
      const token = error.data?.token
      if (token) {
        const uss = services.server.UserSessionService
        await uss.deleteSessionByToken(token)
        error.data = null
      }
    }
    throw error
  }
}

/**
 * Authenticates the user based on the request, but the authentication is optional.
 * @param request - The request object.
 * @returns The user details if the token is provided, otherwise null.
 * @throws {Error} If the session is not found.
 */
const optionalAuth = async (request: Request) => {
  let token: string | null = null
  const uss = services.server.UserSessionService
  const authorization = request.headers.get('authorization') ?? ''
  const tokenParts = authorization.split(' ')
  let userDetails: IUserDetails | null = null
  let bearerTokenSent = tokenParts.length === 2 && tokenParts[0] === 'Bearer'

  if (bearerTokenSent) {
    token = tokenParts[1]
    userDetails = jwt.verifyToken(token) as IUserDetails
  }

  let session: IUserSession | null = null

  if (token) {
    session = await uss.findSessionByToken(token)

    if (!session) {
      throw ErrorHandlingService.badRequest({
        data: {
          logout: true
        }
      })
    }

    session = await uss.updateSessionByToken(token, {
      lastLogin: new Date()
    })
  }

  return [userDetails, session]
}

/**
 * Authenticates the user based on the request and applies additional options.
 * @param request - The request object.
 * @param options - The options for the middleware.
 * @returns The user details along with the token.
 * @throws {Error} If the user is not found or the user type is not as expected.
 */
const withUser = async (request: Request, options?: IWithUserOptions) => {
  const [authData, session] = await auth(request)

  const select = [...new Set(['email', 'type', 'status', ...(options?.select ?? [])])]

  const user = await UserModel.findById(new mongoose.Types.ObjectId(authData!.id as string)).select(select.join(' '))

  if (!user) {
    throw ErrorHandlingService.userNotFound()
  }

  const status = user.toJSON().status

  if (status !== CONST.USER.STATUS.ACTIVE) {
    if (status === CONST.USER.STATUS.DELETED) {
      throw ErrorHandlingService.unAuthorized({
        message: CONST.RESPONSE_MESSAGES.ACCOUNT_DELETED,
        data: {
          logout: true
        }
      })
    } else {
      throw ErrorHandlingService.unAuthorized({
        message: CONST.RESPONSE_MESSAGES.ACCOUNT_INACTIVE,
        data: {
          logout: true
        }
      })
    }
  }

  if (options) {
    switch (true) {
      case options.withAdmin && user.type !== CONST.USER.TYPES.ADMIN:
        throw ErrorHandlingService.unAuthorized({
          message: CONST.RESPONSE_MESSAGES.NOT_ADMIN
        })
      case options.withCorporateEmployer && user.type !== CONST.USER.TYPES.CORPORATE_EMPLOYER:
        throw ErrorHandlingService.unAuthorized({
          message: CONST.RESPONSE_MESSAGES.NOT_CORPORATE_EMPLOYER
        })
      case options.withGovtOrganization && user.type !== CONST.USER.TYPES.GOVT_ORGANISATION:
        throw ErrorHandlingService.unAuthorized({
          message: CONST.RESPONSE_MESSAGES.NOT_GOVT_ORGANISATION
        })
      case options.withIndividual && user.type !== CONST.USER.TYPES.INDIVIDUAL:
        throw ErrorHandlingService.unAuthorized({
          message: CONST.RESPONSE_MESSAGES.NOT_INDIVIDUAL
        })
      case options.withThirdPartyAdministrator && user.type !== CONST.USER.TYPES.THIRD_PARTY_ADMINISTRATOR:
        throw ErrorHandlingService.unAuthorized({
          message: CONST.RESPONSE_MESSAGES.NOT_GOVT_THIRD_PARTY_ADMINISTRATOR
        })
    }
  }

  return {
    ...authData,
    userId: user._id as any,
    ...user.toJSON(),
    session: session!
  }
}

/**
 * Object containing all the middleware functions.
 */
const middlewares = {
  optionalAuth,
  auth,
  withUser
}

export { middlewares }
