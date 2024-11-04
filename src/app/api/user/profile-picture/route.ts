import { dbConfig } from '@/configs/dbConfig'
import UserModel from '@/models/user.model'
import { ErrorHandlingService } from '@/services/ErrorHandling.service'
import { FileManagerService } from '@/services/FileManager.service'
import { services } from '@/services/index.service'
import { middlewares } from '@/utils/middlewares'
import { utils } from '@/utils/utils'

export async function PUT(request: Request) {
  return utils.errorHandler(async function () {
    await dbConfig()

    const us = services.server.UserService
    const authData = await middlewares.withUser(request, {
      select: ['profilePicture']
    })
    const userId = authData.userId
    const formData = await utils.getReqBody(request, { formData: true })
    const body = utils.formData.formDataToJson({ formData: formData as FormData })

    const fvs = services.FileValidatorService
    const fs = services.server.FileService

    const validatorResponse = await fvs.validateFileData(body, {
      multiple: false,
      validFileTypes: utils.CONST.USER.VALID_PROFILE_PICTURE_TYPES
    })

    if (!validatorResponse.status) {
      throw ErrorHandlingService.badRequest({
        message: validatorResponse.message!
      })
    }

    const file = body.file as File
    const profileBuffer = await utils.file.fileToBuffer(file)
    const newFileName = utils.file.generateUniqueFileName(file)
    const fm = new FileManagerService()

    if (authData.profilePicture) {
      try {
        fm.deleteFile('profile-pictures', authData.profilePicture)
        fs.deleteFileByPath(authData.profilePicture)
      } catch (error) {
        console.error({ error })
      }
    }

    const {
      data: { filePath: thumbnailStoragePath }
    } = fm.writeFile('profile-pictures', newFileName, profileBuffer)

    await fs.createFile({
      type: 'profile-pictures',
      userId: authData.id,
      originalName: file.name,
      fileName: newFileName,
      filePath: thumbnailStoragePath,
      fileType: file.type,
      size: file.size
    })

    let user = await us.updateUser(userId, {
      profilePicture: thumbnailStoragePath
    })

    const commonKeysValues = utils.helpers.user.getUserDetails(user ?? new UserModel())

    return Response.json(
      utils.generateRes({
        status: true,
        data: commonKeysValues,
        message: utils.CONST.RESPONSE_MESSAGES._UPDATED_SUCCESSFULLY.replace('[ITEM]', 'Profile picture')
      })
    )
  })
}
