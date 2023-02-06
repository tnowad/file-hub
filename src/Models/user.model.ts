import { Schema, model, Document, Model, Types } from 'mongoose'
import IUser from '../interfaces/IUser'

interface IUserSchema extends Document {
  name: string
  email: string
  password: string
}

interface IUserModel extends Model<IUserSchema> {
  existsWithId(_id: string | Types.ObjectId): Promise<boolean>
  existsWithUsername(
    username: string,
    exceptionId?: string | Types.ObjectId,
  ): Promise<boolean>
  findByUsername(username: string): Promise<string>
}
const userSchema: Schema<IUser, IUserModel> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.statics.existsWithId = async function existsWithId(_id) {
  const count = await this.countDocuments({ _id })
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
export default {
  User,
}
