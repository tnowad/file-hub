import express from 'express'
import * as dotenv from 'dotenv'
import apiRoutes from './routes/api.routes'
dotenv.config()

const port = process.env.PORT

class App {
	public app: express.Application
	constructor() {
		this.app = express()
		this.config()
		this.mongoSetup()
		this.routes()
	}
	private config(): void {}
	private mongoSetup(): void {}
	private routes(): void {
		this.app.use('/api/', apiRoutes)
	}
}

export default new App().app
