import { Schema, model, Document, Model, Types } from 'mongoose'

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUser {
  name: string
  email: string
  password: string
  role?: string
  lastLogin?: Date
  createAt?: Date
  salt?: string
}

export interface IUserChangePassword extends IUser {
  newPassword: string
}

export interface PasswordAndSalt {
  password: string
  salt: string
}

export interface IUserSchema extends IUser, Document {
  getUserToken(): string
  changePassword(data: IUserChangePassword): Promise<IUserSchema>
  changeInformation(data: IUser): Promise<IUserSchema>
  updateLoginTime(): Promise<IUserSchema>
}

export interface IUserModel extends Model<IUserSchema> {
  checkData(data: any): boolean
  loginValidation(data: IUser, first?: boolean): Promise<IUserSchema>
  getToken(data: IUserSchema): string
  createPassword(password: string): Promise<PasswordAndSalt>
  createUser(data: IUser): Promise<IUserSchema>
  findByEmail(email: string): Promise<IUserSchema>
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
  salt: {
    type: String,
    default: process.env.SECRET_KEY || 'SECRET_KEY',
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
})

userSchema.methods.getUserToken = function (this: IUserSchema): string {
  return (this.constructor as IUserModel).getToken(this)
}

userSchema.methods.changePassword = function (
  this: IUserSchema,
  data: IUserChangePassword,
): Promise<IUserSchema> {
  return new Promise<IUserSchema>((resolve, reject) => {
    ;(this.constructor as IUserModel)
      .createPassword(data.newPassword)
      .then((passSalt) => {
        ;(this.password = passSalt.password), (this.salt = passSalt.salt)
        this.save()
          .then((data: IUserSchema) => resolve(data))
          .catch((error) => reject(error))
      })
  })
}

userSchema.methods.changeInformation = function (
  this: IUserSchema,
  data: IUser,
): Promise<IUserSchema> {
  Object.keys(data).forEach((value) => {
    if (
      value in this &&
      value != 'email' &&
      value != '_id' &&
      value != 'password' &&
      value != 'salt' &&
      value != 'createAt' &&
      value != 'role'
    ) {
      ;(this as any)[value] = (data as any)[value] || (this as any)[value]
    }
  })
  return this.save()
}

const User = model<IUserSchema, IUserModel>('User', userSchema)

export default User
