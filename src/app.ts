import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import * as dotenv from 'dotenv'
import apiRoutes from './routes/api.routes'
import notFoundMiddleware from './middleware/notFound.middleware'
import mongoose from 'mongoose'

dotenv.config()

class App {
  public app: express.Application
  constructor() {
    this.app = express()
    this.config()
    this.middleware()
    this.mongoSetup()
    this.routes()
  }
  private config(): void {
    // about set view engine
    // folder view
  }
  private middleware(): void {
    this.app.use(morgan('dev'))
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(
      cors({
        origin: 'http://localhost:3000',
      }),
    )
    this.app.use(helmet())
  }
  private mongoSetup(): void {
    const uri = process.env.MONGO_URI as string
    const mongoUser = process.env.MONGO_USER as string
    const mongoPassword = process.env.MONGO_PASSWORD as string
    mongoose.set('strictQuery', true)
    mongoose
      .connect(uri, {
        user: mongoUser,
        pass: mongoPassword,
        socketTimeoutMS: 1000,
        connectTimeoutMS: 1000,
        serverSelectionTimeoutMS: 1000,
      })
      .then(() => {
        console.log(`> MongoDB connected`)
      })
      .catch((error) => {
        console.error('\x1b[7m> Cannot connect MongoDB\x1b[0m')
        console.error(error)
        process.exit(0)
      })
  }
  private routes(): void {
    this.app.get('/*', express.static(path.join(__dirname, './public')))
    this.app.use('/api/', apiRoutes)
    this.app.use('*', notFoundMiddleware)
  }
}

export default new App().app
