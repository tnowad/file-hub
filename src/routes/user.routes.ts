import { Router, Request, Response } from 'express'
class UserRoutes {
	public router: Router
	constructor() {
		this.router = Router()
	}
	private routes(): void {}
}
export default new UserRoutes().router
