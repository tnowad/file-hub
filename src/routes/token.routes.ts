import { Router } from 'express'
class TokenRoutes {
  public router: Router
  constructor() {
    this.router = Router()
    this.routes()
  }
  private routes(): void {}
}
export default new TokenRoutes().router
