import { Request, Response } from 'express'
const login = (req: Request, res: Response) => {
  const { username, password } = req.body
  console.log(username, password)
  // ...
  // Check if the provided username and password are valid
  // ...
  res.send({ success: true, message: 'Login successful' })
}

const register = (req: Request, res: Response) => {
  const { username, password } = req.body
  console.log(username, password)
  // ...
  // Register a new user
  // ...
  res.send({ success: true, message: 'Registration successful' })
}
export default {
  login,
  register,
}
