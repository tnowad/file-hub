import express from 'express'
import * as dotenv from 'dotenv'
import apiRoutes from './routes/api.routes'
import loggerMiddleware from './middleware/logger.middleware'
import notFoundMiddleware from './middleware/notFound.middleware'

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
    this.app.use('*', notFoundMiddleware)
  }
}

export default new App().app
