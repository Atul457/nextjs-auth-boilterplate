// UserService.ts

import UserModel, { IUser } from '@/models/user.model'
import { Model } from 'mongoose'

interface IUserService {
  createUser(data: Partial<IUser>): Promise<IUser>
  findUserByEmail(email: string): Promise<IUser | null>
  updateUser(id: string, data: Partial<IUser>): Promise<IUser | null>
  deleteUser(id: string): Promise<IUser | null>
  getUserById(id: string): Promise<IUser | null>
}

class UserService implements IUserService {
  private userModel: Model<IUser>

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel
  }

  async createUser(data: Partial<IUser>): Promise<IUser> {
    const user = new this.userModel(data)
    return user.save()
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return this.userModel.findOne({ email: new RegExp(email, 'gi') })
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return this.userModel.findByIdAndUpdate(id, data, { new: true })
  }

  async deleteUser(id: string): Promise<IUser | null> {
    return this.userModel.findByIdAndDelete(id)
  }

  async getUserById(id: string): Promise<IUser | null> {
    return this.userModel.findById(id)
  }
}

export default new UserService(UserModel)
