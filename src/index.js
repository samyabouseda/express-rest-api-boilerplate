import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import models from './models'
import { connectDb } from './db'
import controllers from './controllers'

const eraseDatabaseOnSync = process.env.ERASE_DB_ON_SYNC
const port = process.env.PORT
const app = express()

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
	if (eraseDatabaseOnSync) {
		await Promise.all([
			models.User.deleteMany({}),
			models.Message.deleteMany({}),
		])
		createUsersWithMessages()
	}

	app.listen(port, () =>
		console.log(`Example app listening on port ${port}!`),
	)
})

const createUsersWithMessages = async () => {
	const user1 = new models.User({
		username: 'rwieruch',
	})
	const user2 = new models.User({
		username: 'boby',
	})

	const message1 = new models.Message({
		text: 'Published the Road to learn React',
		user: user1.id,
	})
	const message2 = new models.Message({
		text: 'Happy to release ...',
		user: user2.id,
	})
	const message3 = new models.Message({
		text: 'Published a complete book',
		user: user2.id,
	})

	await message1.save()
	await message2.save()
	await message3.save()
	await user1.save()
	await user2.save()
}
