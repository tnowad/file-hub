import express from 'express'
import * as dotenv from 'dotenv'
import apiRoutes from './routes/api.routes'
import authenticationMiddleware from './public/middleware/authentication.middleware'
import loggerMiddleware from './public/middleware/logger.middleware'

dotenv.config()

class App {
	public app: express.Application
	constructor() {
		this.app = express()
		this.config()
		this.mongoSetup()
		this.routes()
	}
	private config(): void {
		this.app.use(loggerMiddleware)
	}
	private mongoSetup(): void {}
	private routes(): void {
		this.app.use('/api/', apiRoutes)
	}
}

export default new App().app
