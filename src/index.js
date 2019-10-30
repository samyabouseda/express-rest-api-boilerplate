import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import models from './models'
import { connectDb } from './datasources'
import routes from './api'

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(async (req, res, next) => {
	req.context = {
		models,
	}
	next()
})

app.use('/', routes)

connectDb().then(async () => {
	app.listen(PORT, () =>
		console.log(`Server is running at ${PORT}`),
	)
})
