import { dbConfig } from '@/configs/dbConfig'
import { schemas } from '@/schemas/index.schemas'
import { services } from '@/services/index.service'
import { utils } from '@/utils/utils'

export async function POST(request: Request) {
  return utils.errorHandler(async function () {
    await dbConfig()

    const ms = services.MailService

    const body = await utils.getReqBody(request)
    const validatedData = await schemas.common.forgotPasswordSchema.validate(body ?? {})
    const { email } = validatedData

    const us = services.server.UserService
    const existingUser = await us.findUserByEmail(email)

    if (existingUser) {
      const uss = services.server.UserSessionService

      const commonKeysValues = {
        type: existingUser.type,
        email: existingUser.email
      }

      const token = utils.jwt.generateToken({ ...commonKeysValues, id: existingUser._id }, '10m')

      const session = await uss.createSession({
        userId: existingUser._id as any,
        lastLogin: new Date(),
        token,
        type: 'reset-password',
        userType: existingUser.type
      })

      const resetPasswordLink = `/login?token=${session.token}`
      const userName = utils.helpers.user.getFullName(existingUser)
      const resetPasswordUrl = `${process.env.NEXT_PUBLIC_APP_PROD_HOSTNAME ?? ''}${resetPasswordLink}`

      await ms.forgotPasswordMail({
        email: existingUser.email,
        userName,
        resetPasswordUrl
      })
    }

    return Response.json(
      utils.generateRes({
        status: true,
        message: utils.CONST.RESPONSE_MESSAGES.EMAIL_SENT
      })
    )
  })
}
