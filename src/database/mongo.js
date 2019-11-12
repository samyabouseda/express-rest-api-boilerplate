import config from '../../config'
import mongoose from 'mongoose'
import models from '../models'

const {
	host,
	port,
	name,
	eraseDbOnSync,
} = config.db
const DATABASE_URL = `mongodb://${host}:${port}/${name}x`

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
			if (eraseDbOnSync) { await eraseDb() }
			seedDatabase()
			// await seedDb(userSeeds)
			// await seedDb(messageSeeds)
		})
		.catch(error => {
			console.log(error)
		})

// TODO: Refactor and move to specialized file.
// const fs = require('fs')
// const util = require('util')
// const readFile = util.promisify(fs.readFile)
// const dataFilePath = `${__dirname}/seeds/data.json`

// let seeds = []
// // const seedRegex = **/?(*.)+(seed).[tj]s?(x)
// readFile(dataFilePath)
// 	.then(data => {
// 		seeds = JSON.parse(data)
// 	})
// 	.catch(error => console.log(error))
// //

const eraseDb = async () => {
	// TODO: Refactor to include all models dynamically.
	await Promise.all([
		models.User.deleteMany({}),
		models.Message.deleteMany({}),
	])
}

// const seed = async seeds => {
// 	await seeds.map(async seed => {
// 		const entry = await createEntry(seed)
// 		const owns = seed.owns
// 		if (owns) {
// 			owns.map(async own => {
// 				const { model, fields } = own
// 				const { fk, ...field } = fields
// 				const obj = {
// 					model,
// 					fields: {
// 						[fk]: entry.id,
// 						...field,
// 					},
// 				}
// 				await createEntry(obj)
// 			})
// 		}
// 	})
// }

// const createEntry = async seed => {
// 	const entry = new models[seed.model](seed.fields)
// 	await entry.save()
// 	return entry
// }

// Respect order of files
import userSeeds from './seeds/0_User.seed'
import messageSeeds from './seeds/1_Message.seed'

const fs = require('fs')
const util = require('util')
const readDir = util.promisify(fs.readdir).bind(fs)
const path = require('path')

async function seedDatabase (runSaveMiddleware = false) {
	// const dir = await readDir(__dirname)
	const seeds = await readDir(`${__dirname}/seeds`)

	for (const file of seeds) {
		const fileName = file.split('.seed.js')[0].split('_')[1]
		// const modelName = toTitleCase(fileName)
		const model = mongoose.models[fileName]

		if (!model) throw new Error(`Cannot find Model '${fileName}'`)
		const fileContents = require(path.join(__dirname, 'seeds', file))

		runSaveMiddleware
			? await model.create(fileContents.default.data)
			: await model.insertMany(fileContents.default.data)
	}
}

// const seedDb = async seeds => {
// 	const { model, data } = seeds
// 		await data.map(async seed => {
// 			const entry = await new models[model](seed)
// 			await entry.save()
// 		})
// }

export { connectMongoDb }
