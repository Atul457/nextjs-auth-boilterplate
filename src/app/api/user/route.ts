import { utils } from '@/utils/utils'
import { dbConfig } from '@/configs/dbConfig'
import { middlewares } from '@/utils/middlewares'
import { services } from '@/services/index.service'
import { IUser } from '@/store/types'
import { schemas } from '@/schemas/index.schemas'
import UserModel from '@/models/user.model'

export async function GET(request: Request) {
  return utils.errorHandler(async function () {
    await dbConfig()

    const us = services.server.UserService
    const authData = await middlewares.withUser(request)
    const userId = authData.userId

    const user = (await us.getUserById(userId))!

    const updatedUser = utils.helpers.user.getUserDetails(user ?? new UserModel())

    return Response.json(
      utils.generateRes({
        status: true,
        data: {
          user: updatedUser
        }
      })
    )
  })
}

export async function PATCH(request: Request) {
  return utils.errorHandler(async function () {
    await dbConfig()

    const authData = await middlewares.withUser(request)
    const body = await utils.getReqBody(request)

    const validatedData = await schemas.common.updateProfileSchemaWithType.validate({
      ...(body ?? {}),
      type: authData.type
    })
    const { firstName, lastName, address, organizationName, type, phoneNumber } = validatedData

    const us = services.server.UserService

    const isOrganization =
      type === utils.CONST.USER.TYPES.CORPORATE_EMPLOYER || type === utils.CONST.USER.TYPES.GOVT_ORGANISATION

    let user = await us.updateUser(authData.userId, {
      phoneNumber,
      firstName,
      lastName,
      address,
      ...(isOrganization && {
        organizationName
      })
    })

    const updatedUser = utils.helpers.user.getUserDetails(user ?? new UserModel())

    return Response.json(
      utils.generateRes({
        status: true,
        data: updatedUser,
        message: utils.CONST.RESPONSE_MESSAGES._UPDATED_SUCCESSFULLY.replace('[ITEM]', 'Profile')
      })
    )
  })
}

export async function DELETE(request: Request) {
  return utils.errorHandler(async function () {
    await dbConfig()

    const us = services.server.UserService

    const authData = await middlewares.withUser(request)
    const userId = authData.userId

    await us.updateUser(userId, {
      status: utils.CONST.USER.STATUS.DELETED as 0 | 1 | 2
    })

    return Response.json(
      utils.generateRes({
        status: true,
        message: utils.CONST.RESPONSE_MESSAGES._DELETED_SUCCESSFULLY.replace('[ITEM]', 'Account')
      })
    )
  })
}
