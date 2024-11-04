import { http } from '@/utils/http'
import { IUserServiceTypes } from '../types'

class UserService {
  async register(data: Record<any, any>) {
    try {
      const response = await http({
        url: 'auth/signup',
        data,
        method: 'POST'
      })
      return response
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }

  async forgotPassword(data: Record<any, any>) {
    try {
      const response = await http({
        url: 'auth/forgot-password',
        data,
        method: 'POST'
      })
      return response
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }

  async resetPassword(data: IUserServiceTypes['IResetPasswordArgs']) {
    try {
      const response = await http({
        url: 'auth/reset-password',
        data,
        accessToken: data.accessToken,
        method: 'POST'
      })
      return response
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }

  async logout() {
    try {
      const response = await http({
        url: 'user/logout',
        method: 'DELETE'
      })
      return response
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }

  async delete() {
    try {
      const response = await http({
        url: 'user',
        method: 'DELETE'
      })
      return response
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }

  async login(data: Record<any, any>) {
    try {
      const response = await http({
        url: 'auth/signin',
        data,
        method: 'POST'
      })
      return response
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }

  async uploadUserProfilePicture(data: IUserServiceTypes['IUploadUserProfilePictureArgs']) {
    let formData = new FormData()
    formData.append('file', data.file)
    try {
      const response = await http({
        url: 'user/profile-picture',
        data: formData,
        formData: true,
        accessToken: data?.accessToken,
        method: 'PUT'
      })
      return response
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }

  async get() {
    try {
      const response = await http({
        url: 'user',
        method: 'GET'
      })
      return response.data?.user
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }

  async update(data: Record<any, any>) {
    try {
      const response = await http({
        url: 'user',
        data,
        method: 'PATCH'
      })
      return response
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }

  async updatePassword(data: Record<string, any>) {
    try {
      const response = await http({
        url: 'user/password',
        data,
        method: 'PATCH'
      })
      return response
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
}

export { UserService }
