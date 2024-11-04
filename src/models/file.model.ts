import { Document, model, Model, models, Schema } from 'mongoose'
import { FILE_MANAGER } from '@/constants/fileManager.const'

export interface IFile extends Document {
  type: keyof typeof FILE_MANAGER.FOLDERS
  userId: Schema.Types.ObjectId
  originalName: string
  fileName: string
  filePath: string
  fileType: string
  size: number
}

const FileSchema: Schema<IFile> = new Schema(
  {
    type: {
      type: String,
      enum: ['users', 'profile-pictures'],
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      required: true
    },
    filePath: {
      type: String,
      required: true
    },
    fileType: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

const FileModel = (models?.File as Model<IFile>) || model<IFile>('File', FileSchema, 'files')

export default FileModel
