import { utils } from '@/utils/utils'
import { dbConfig } from '@/configs/dbConfig'
import { services } from '@/services/index.service'
import { middlewares } from '@/utils/middlewares'

export async function DELETE(request: Request) {
  return utils.errorHandler(async function () {
    await dbConfig()

    const authData = await middlewares.withUser(request)
    const us = services.server.UserSessionService
    await us.deleteSessionByToken(authData.token)

    return Response.json(
      utils.generateRes({
        status: true,
        message: 'Logged out successfully'
      })
    )
  })
}
