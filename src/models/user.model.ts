import { Document, model, Model, models, Schema } from 'mongoose'

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  password: string
  /** @info 1 => INDIVIDUAL, 2 => CORPORATE_EMPLOYER, 3 => THIRD_PARTY_ADMINISTRATOR, 4 => GOVT_ORGANISATION */
  type: 1 | 2 | 3 | 4
  /** @info 1 => DIRECTOR, 2 => MANAGER, 3 => SUPERVISOR, 4 => ASSISTANT */
  designation?: 1 | 2 | 3 | 4
  /** @info 0 => Inactive, 1 => Active, 2 => Deleted*/
  status: 0 | 1 | 2
  organizationName?: string
  address: string | null
  phoneNumber: string
  profilePicture: string | null
}

const UserSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: Number, enum: [1, 2, 3, 4], required: true },
    designation: { type: Number, enum: [1, 2, 3, 4] },
    status: { type: Number, enum: [0, 1, 2], default: 1 },
    organizationName: { type: String },
    address: { type: String, default: null },
    phoneNumber: { type: String },
    profilePicture: { type: String, default: null }
  },
  { timestamps: true }
)

const UserModel = (models?.User as Model<IUser>) || model<IUser>('User', UserSchema, 'users')

export default UserModel
