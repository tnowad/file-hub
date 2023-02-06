import { Router } from 'express'
import userControllers from '../controllers/user.controllers'
class UserRoutes {
  public router: Router
  constructor() {
    this.router = Router()
    this.routes()
  }
  private routes(): void {
    this.router.get('/', userControllers.getAllUser)
  }
}
export default new UserRoutes().router
