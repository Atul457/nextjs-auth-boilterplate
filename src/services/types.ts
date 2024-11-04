type IUploadUserProfilePictureArgs = {
  file: File
  accessToken?: string
}

type IResetPasswordArgs = {
  password: string
  accessToken: string
}

type IUploadUserProfilePicture = (data: IUploadUserProfilePictureArgs) => Promise<any>

export type IUserServiceTypes = {
  IResetPasswordArgs: IResetPasswordArgs
  IUploadUserProfilePicture: IUploadUserProfilePicture
  IUploadUserProfilePictureArgs: IUploadUserProfilePictureArgs
}

export interface IPaginationArgs {
  query?: string
  page: number
  limit: number
  sort?: string
  order?: 'asc' | 'desc'
  userId?: string
}
