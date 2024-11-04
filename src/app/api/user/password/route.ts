import { dbConfig } from '@/configs/dbConfig'
import { schemas } from '@/schemas/index.schemas'
import { ErrorHandlingService } from '@/services/ErrorHandling.service'
import { services } from '@/services/index.service'
import { middlewares } from '@/utils/middlewares'
import { utils } from '@/utils/utils'

export async function PATCH(request: Request) {
  return utils.errorHandler(async function () {
    await dbConfig()

    const authData = await middlewares.withUser(request, {
      select: ['password']
    })

    const us = services.server.UserService
    const body = await utils.getReqBody(request)

    const validatedData = await schemas.common.updatePassword.validate(body ?? {})

    const { oldPassword, newPassword } = validatedData

    const passwordMatched = await utils.bcrypt.comparePassword(oldPassword, authData.password)

    if (!passwordMatched) {
      throw ErrorHandlingService.badRequest({
        message: utils.CONST.RESPONSE_MESSAGES.INCORRECT_OLD_PASSWORD
      })
    }

    const password = await utils.bcrypt.hashPassword(newPassword)

    await us.updateUser(authData.userId, {
      password
    })

    return Response.json(
      utils.generateRes({
        status: true,
        message: utils.CONST.RESPONSE_MESSAGES._UPDATED_SUCCESSFULLY.replace('[ITEM]', 'Password')
      })
    )
  })
}
