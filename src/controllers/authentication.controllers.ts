import { Request, Response } from 'express'
import { IUserSchema } from '../Models/user.model'
const login = (req: Request, res: Response) => {
  const { email, password } = req.body
  console.log(email, password)
  // ...
  // Check if the provided username and password are valid
  // ...
  res.send({ success: true, message: 'Login successful' })
}

const register = (req: Request, res: Response) => {
  let data: IUserSchema = req.body as IUserSchema
  console.log(data)
  // ...
  // Register a new user
  // ...
  res.send({ success: true, message: 'Registration successful' })
}
export default {
  login,
  register,
}
