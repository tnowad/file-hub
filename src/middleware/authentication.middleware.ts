import { Request, Response, NextFunction } from 'express'
export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  // ...
  // Validate the authorization header
  // ...
  const isAuthorized = true
  if (!isAuthorized) {
    return res.status(401).send({ success: false, message: 'Unauthorized' })
  }
  next()
}
