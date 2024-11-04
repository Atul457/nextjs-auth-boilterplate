import { CONST } from '@/constants'
import { IUser } from '@/models/user.model'
import FileValidatorService from '@/services/FileValidator.service'
import { file as fileUtil } from '@/utils/file'
import { toast } from './toast'

type IProfilePictureChangeArgs = {
  e: React.ChangeEvent<HTMLInputElement>
  setProfilePicture: Function
  setConverting: Function
}

const getFullName = (args: { firstName: IUser['firstName']; lastName: IUser['lastName'] }) => {
  return [args.firstName.trim(), args.lastName.trim()].join(' ')
}

const profilePictureChange = async (args: IProfilePictureChangeArgs) => {
  let updated = false
  try {
    let file = args.e.target.files?.[0] ?? null
    args.e.target.value = ''

    const { MAX_PROFILE_PICTURE_SIZE, VALID_PROFILE_PICTURE_TYPES } = CONST.USER

    if (!file) {
      return updated
    }

    const response = await FileValidatorService.validateFileData(
      { file },
      {
        maxFileSize: fileUtil.convertValue(MAX_PROFILE_PICTURE_SIZE, 'MB', 'B'),
        validFileTypes: VALID_PROFILE_PICTURE_TYPES
      }
    )

    if (response.message) {
      toast.info({ message: response.message })
      return updated
    }

    args.setConverting(true)

    const base64 = await fileUtil.fileObjToBase64(file)
    args.setProfilePicture({
      src: base64 as string,
      file
    })

    updated = true
  } catch (error) {
    console.error(error)
  } finally {
    args.setConverting(false)
  }
}

const getUserDetails = (user: IUser, forJwt = false) => {
  const isOrganization =
    user.type === CONST.USER.TYPES.CORPORATE_EMPLOYER || user.type === CONST.USER.TYPES.GOVT_ORGANISATION

  let commonKeysValues: Partial<IUser> = {
    type: user.type,
    profilePicture: user.profilePicture ?? null,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  }

  if (!forJwt) {
    commonKeysValues['address'] = user.address ?? null
    commonKeysValues['phoneNumber'] = user.phoneNumber
    if (isOrganization) {
      commonKeysValues['organizationName'] = user.organizationName
    }
  } else {
    commonKeysValues['id'] = user._id
  }

  return commonKeysValues
}

const user = {
  getUserDetails,
  getFullName,
  profilePictureChange
}

const helpers = {
  user
}

export { helpers }
