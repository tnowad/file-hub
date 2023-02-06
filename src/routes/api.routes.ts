import { Router, Request, Response } from 'express'
import userRoutes from './user.routes'
class ApiRoutes {
	public router: Router
	constructor() {
		this.router = Router()
	}
	private routes(): void {
		this.router.use('/user/', userRoutes)
	}
}
export default new ApiRoutes().router
