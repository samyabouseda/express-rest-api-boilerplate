import 'dotenv/config'
import mongoose from 'mongoose'
import models from '../models'

// TODO: Move this to a config file.
const {
	MONGO_HOSTNAME,
	MONGO_PORT,
	MONGO_DB,
	ERASE_DB_ON_SYNC,
} = process.env
const DATABASE_URL = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
//

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
	reconnectTries: Number.MAX_VALUE,
	reconnectInterval: 500,
	connectTimeoutMS: 10000,
}

const connectMongoDb = () =>
	mongoose
		.connect(DATABASE_URL, options)
		.then(async () => {
			if (ERASE_DB_ON_SYNC) { await eraseDb() }
			seed(seeds)
		})
		.catch(error => {
			console.log(error)
		})

// TODO: Refactor and move to specialized file.
const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const dataFilePath = `${__dirname}/seeds/data.json`

let seeds = []
// const seedRegex = **/?(*.)+(seed).[tj]s?(x)
readFile(dataFilePath)
	.then(data => {
		seeds = JSON.parse(data)
	})
	.catch(error => console.log(error))
//

const eraseDb = async () => {
	// TODO: Refactor to include all models dynamically.
	await Promise.all([
		models.User.deleteMany({}),
		models.Message.deleteMany({}),
	])
}

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
