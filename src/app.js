import express from 'express'
import { applyMiddleware, injectModels } from './middleware'
import cors from 'cors'
import routes from './api'

const app = express()

applyMiddleware(app, [
	cors(),
	express.json(),
	express.urlencoded({ extended: true }),
	injectModels,
])

app.use('/', routes)

export default app
