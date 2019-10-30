import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDb from './datasources'
import routes from './api'
import { applyMiddleware, injectModels } from './middleware'

const app = express()
const PORT = process.env.PORT

applyMiddleware(app, [
	cors(),
	express.json(),
	express.urlencoded({ extended: true }),
	injectModels,
])

app.use('/', routes)

connectDb().then(async () => {
	app.listen(PORT, () =>
		console.log(`Server is running at ${PORT}`),
	)
})
