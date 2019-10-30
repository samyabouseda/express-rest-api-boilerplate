import 'dotenv/config'
import mongoose from 'mongoose'
import models from '../models'

// TODO: Refactor to improve readability and modularity.
const ERASE_DB_ON_SYNC = process.env.ERASE_DB_ON_SYNC

mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true)

const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const dataFilePath = `${__dirname}/seeds/data.json`

let seeds = []
readFile(dataFilePath)
	.then(data => {
		seeds = JSON.parse(data)
	})
	.catch(error => console.log(error))

const connectMongoDb = () =>
	mongoose.connect(process.env.DATABASE_URL).then(async () => {
		if (ERASE_DB_ON_SYNC) {
			await Promise.all([
				models.User.deleteMany({}),
				models.Message.deleteMany({}),
			])
			seed(seeds)
		}
	})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to database'))

const seed = async seeds => {
	await seeds.map(async seed => {
		const entry = await createEntry(seed)
		const owns = seed.owns
		if (owns) {
			owns.map(async own => {
				const { model, fields } = own
				const { fk, ...field } = fields
				const obj = {
					model,
					fields: {
						[fk]: entry.id,
						...field,
					},
				}
				await createEntry(obj)
			})
		}
	})
}

const createEntry = async seed => {
	const entry = new models[seed.model](seed.fields)
	await entry.save()
	return entry
}

export { connectMongoDb }
