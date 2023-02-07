import { Schema, model, Document, Model, Types } from 'mongoose'

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUserSchema extends Document {
  name: string
  email: string
  role: string
  password: string
}

export interface IUserModel extends Model<IUserSchema> {
  existsWithId(_id: string | Types.ObjectId): Promise<boolean>
  existsWithUsername(
    username: string,
    exceptionId?: string | Types.ObjectId,
  ): Promise<boolean>
  findByUsername(username: string): Promise<string>
}

export const userSchema: Schema<IUserSchema, IUserModel> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: UserRole,
    default: UserRole.USER,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.statics.existsWithId = async function existsWithId(_id) {
  const count = await this.countDocuments({ _id: _id })
  return count > 0
}

userSchema.statics.existsWithUsername = async function existsWithUsername(
  username,
  exceptionId,
) {
  const count = await this.countDocuments({
    username,
    _id: { $ne: exceptionId },
  })
  return count > 0
}

userSchema.statics.findByUsername = function findByUsername(username) {
  return this.findOne({ username })
}

const User = model<IUserSchema, IUserModel>('User', userSchema)

export default User
