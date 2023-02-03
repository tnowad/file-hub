import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT

const app = express()

app.listen(port, () => {
	console.log(`✅ Server is running on port: ${port}`)
})
