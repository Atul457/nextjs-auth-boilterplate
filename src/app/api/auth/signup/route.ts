import { ErrorHandlingService } from '@/services/ErrorHandling.service'
import { utils } from '@/utils/utils'
import UserModel, { IUser } from '@/models/user.model'
import { dbConfig } from '@/configs/dbConfig'
import { services } from '@/services/index.service'
import { schemas } from '@/schemas/index.schemas'

export async function POST(request: Request) {
  return utils.errorHandler(async function () {
    await dbConfig()

    const body = await utils.getReqBody(request)
    const validatedData = await schemas.server.register.validate(body ?? {})
    const { firstName, email, type, phoneNumber, lastName, address, organizationName, designation } = validatedData
    const password = await utils.bcrypt.hashPassword(validatedData.password)

    const us = services.server.UserService
    const uss = services.server.UserSessionService

    const existingUser = await UserModel.findOne({
      email: new RegExp(email, 'gi'),
      status: utils.CONST.USER.STATUS.ACTIVE
    })

    if (existingUser) {
      throw ErrorHandlingService.userAlreadyExists()
    }

    const isOrganization =
      type === utils.CONST.USER.TYPES.CORPORATE_EMPLOYER || type === utils.CONST.USER.TYPES.GOVT_ORGANISATION

    const nonFlow =
      type === utils.CONST.USER.TYPES.GOVT_ORGANISATION || type === utils.CONST.USER.TYPES.THIRD_PARTY_ADMINISTRATOR

    if (nonFlow) {
      throw ErrorHandlingService.badRequest({
        message: utils.CONST.RESPONSE_MESSAGES.NOT_ALLOWED_TO_REGISTER
      })
    }

    const user = await us.createUser({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phoneNumber,
      address,
      password,
      ...(isOrganization && {
        organizationName,
        designation: designation as IUser['designation']
      }),
      type: type as IUser['type']
    })

    const commonKeysValues = utils.helpers.user.getUserDetails(user)

    const token = utils.jwt.generateToken({
      ...commonKeysValues,
      id: user._id
    })

    await uss.createSession({
      userId: user._id as any,
      lastLogin: new Date(),
      token,
      userType: user.type
    })

    return Response.json(
      utils.generateRes({
        status: true,
        data: {
          token,
          user: commonKeysValues
        },
        message: 'User created successfully'
      })
    )
  })
}
