import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import * as dotenv from 'dotenv'
import apiRoutes from './routes/api.routes'
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
    this.app.use(morgan('dev'))
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(cors())
  }
  private mongoSetup(): void {}
  private routes(): void {
    this.app.get('/*', express.static(path.join(__dirname, './public')))
    this.app.use('/api/', apiRoutes)
    this.app.use('*', notFoundMiddleware)
  }
}

export default new App().app
