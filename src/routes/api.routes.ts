import { Router } from 'express'
import userRoutes from './user.routes'
import authenticationControllers from '../controllers/authentication.controllers'

class ApiRoutes {
	public router: Router
	constructor() {
		this.router = Router()
		this.routes()
	}
	private routes(): void {
		this.router.use('/user/', userRoutes)

		this.router.post('/login', authenticationControllers.login)
		this.router.post('/register', authenticationControllers.register)
	}
}

export default new ApiRoutes().router
