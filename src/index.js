import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import models from './models'
import { connectDb } from './db'
import controllers from './controllers'

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(async (req, res, next) => {
	req.context = {
		models,
		me: await models.User.findByLogin('rwieruch'),
	}
	next()
})

app.use('/session', controllers.session)
app.use('/users', controllers.user)
app.use('/messages', controllers.message)

connectDb().then(async () => {
	app.listen(port, () =>
		console.log(`App listening on port ${port}!`),
	)
})
