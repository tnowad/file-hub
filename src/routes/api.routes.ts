import { Router } from 'express'
import authenticationControllers from '../controllers/authentication.controllers'
import authenticationMiddleware from '../middleware/authentication.middleware'
import tokenRoutes from './token.routes'
import userRoutes from './user.routes'

class ApiRoutes {
  public router: Router
  constructor() {
    this.router = Router()
    this.routes()
  }
  private routes(): void {
    this.router.use('/user/', authenticationMiddleware, userRoutes)
    this.router.use('/token/', authenticationMiddleware, tokenRoutes)
    this.router.post('/login', authenticationControllers.login)
    this.router.post('/register', authenticationControllers.register)
  }
}

export default new ApiRoutes().router
