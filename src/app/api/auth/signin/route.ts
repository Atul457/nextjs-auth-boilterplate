import { ErrorHandlingService } from '@/services/ErrorHandling.service'
import { utils } from '@/utils/utils'
import { dbConfig } from '@/configs/dbConfig'
import { services } from '@/services/index.service'
import { schemas } from '@/schemas/index.schemas'
import UserModel from '@/models/user.model'

export async function POST(request: Request) {
  return utils.errorHandler(async function () {
    await dbConfig()

    const body = await utils.getReqBody(request)
    const validatedData = await schemas.common.login.validate(body ?? {})
    const { email, password } = validatedData

    const uss = services.server.UserSessionService

    const existingUser = await UserModel.findOne({
      email: new RegExp(email, 'gi'),
      status: utils.CONST.USER.STATUS.ACTIVE
    })

    if (!existingUser) {
      throw ErrorHandlingService.badRequest({
        message: utils.CONST.RESPONSE_MESSAGES.INVALID_CREDENTIALS
      })
    }

    const passwordMatched = await utils.bcrypt.comparePassword(password, existingUser.password)

    if (!passwordMatched) {
      throw ErrorHandlingService.badRequest({
        message: utils.CONST.RESPONSE_MESSAGES.INVALID_CREDENTIALS
      })
    }

    const commonKeysValues = utils.helpers.user.getUserDetails(existingUser)

    const token = utils.jwt.generateToken({
      ...commonKeysValues,
      id: existingUser._id
    })

    await uss.createSession({
      userId: existingUser._id as any,
      lastLogin: new Date(),
      token,
      userType: existingUser.type
    })

    return Response.json(
      utils.generateRes({
        status: true,
        data: {
          token,
          user: commonKeysValues
        },
        message: 'User logged in successfully'
      })
    )
  })
}
