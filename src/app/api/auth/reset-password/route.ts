import { dbConfig } from '@/configs/dbConfig'
import { schemas } from '@/schemas/index.schemas'
import { services } from '@/services/index.service'
import { middlewares } from '@/utils/middlewares'
import { utils } from '@/utils/utils'

export async function POST(request: Request) {
  return utils.errorHandler(async function () {
    await dbConfig()

    const us = services.server.UserService
    const uss = services.server.UserSessionService

    const authData = await middlewares.withUser(request)

    const body = await utils.getReqBody(request)

    const { password: password_ } = await schemas.common.resetPassword.validate(body)
    const password = await utils.bcrypt.hashPassword(password_)

    await us.updateUser(authData.userId, {
      password
    })

    await uss.deleteSessionByToken(authData.session.token)

    return Response.json(
      utils.generateRes({
        status: true,
        message: utils.CONST.RESPONSE_MESSAGES._SUCCESSFULLY.replace('[ITEM]', 'Password reset')
      })
    )
  })
}
