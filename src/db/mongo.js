import 'dotenv/config'
import mongoose from 'mongoose'
import models from '../models'

const eraseDatabaseOnSync = process.env.ERASE_DB_ON_SYNC

mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true)

const connectDb = () =>
	mongoose.connect(process.env.DATABASE_URL).then(async () => {
		if (eraseDatabaseOnSync) {
			await Promise.all([
				models.User.deleteMany({}),
				models.Message.deleteMany({}),
			])
			createUsersWithMessages()
		}
	})
const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to database'))

const createUsersWithMessages = async () => {
	const user1 = new models.User({
		username: 'rwieruch',
	})
	const user2 = new models.User({
		username: 'boby',
	})
	const user3 = new models.User({
		username: 'Dan Abramov',
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
	await user3.save()
}

export { connectDb }
