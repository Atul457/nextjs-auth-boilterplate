import FileModel, { IFile } from '@/models/file.model'
import { Model } from 'mongoose'

interface IFileService {
  createFile(data: Partial<IFile>): Promise<IFile>
  findFileById(fileId: string): Promise<IFile | null>
  findFilesByUserId(userId: string): Promise<IFile[]>
  findFilesByType(type: string): Promise<IFile[]>
  updateFileById(fileId: string, data: Partial<IFile>): Promise<IFile | null>
  deleteFileById(fileId: string): Promise<IFile | null>
  getAllFiles(): Promise<IFile[]>
}

class FileService implements IFileService {
  private fileModel: Model<IFile>

  constructor(fileModel: Model<IFile>) {
    this.fileModel = fileModel
  }

  async createFile(data: Partial<IFile>): Promise<IFile> {
    const file = new this.fileModel(data)
    return file.save()
  }

  async findFileById(fileId: string): Promise<IFile | null> {
    return this.fileModel.findById(fileId).exec()
  }

  async findFilesByUserId(userId: string): Promise<IFile[]> {
    return this.fileModel.find({ userId }).exec()
  }

  async findFilesByType(type: string): Promise<IFile[]> {
    return this.fileModel.find({ type }).exec()
  }

  async updateFileById(fileId: string, data: Partial<IFile>): Promise<IFile | null> {
    return this.fileModel.findByIdAndUpdate(fileId, data, { new: true }).exec()
  }

  async deleteFileById(fileId: string): Promise<IFile | null> {
    return this.fileModel.findByIdAndDelete(fileId).exec()
  }

  async deleteFileByPath(filePath: string): Promise<IFile | null> {
    return this.fileModel.findOneAndDelete({ filePath }).exec()
  }

  async getAllFiles(): Promise<IFile[]> {
    return this.fileModel.find().exec()
  }
}

export default new FileService(FileModel)
