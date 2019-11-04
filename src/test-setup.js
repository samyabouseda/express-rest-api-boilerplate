/**
 * Heavily inspired by Zell Liew
 * @link https://zellwk.com/blog/jest-and-mongoose/
 */

// TODO: https://stackoverflow.com/questions/47997652/jest-beforeall-share-between-multiple-test-files?rq=1

const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.promise = global.Promise

async function removeAllCollections() {
	const collections = Object.keys(mongoose.connection.collections)
	for (const collectionName of collections) {
		const collection =
			mongoose.connection.collections[collectionName]
		await collection.deleteMany()
	}
}

async function dropAllCollections() {
	const collections = Object.keys(mongoose.connection.collections)
	for (const collectionName of collections) {
		const collection =
			mongoose.connection.collections[collectionName]
		try {
			await collection.drop()
		} catch (error) {
			// Sometimes this error happens, but you can safely ignore it
			if (error.message === 'ns not found') return
			// This error occurs when you use it. You can
			// safely ignore this error too
			if (
				error.message.includes(
					'a background operation is currently running',
				)
			)
				return
			console.log(error.message)
		}
	}
}

module.exports = {
	setupDB(databaseName) {
		// Connect to Mongoose
		beforeAll(async () => {
			// TODO: Add support for Docker connection.
			const url = `mongodb://127.0.0.1/${databaseName}`
			await mongoose.connect(url, { useNewUrlParser: true })
		})

		// Cleans up database between each test
		afterEach(async () => {
			await removeAllCollections()
		})

		// Disconnect Mongoose
		afterAll(async () => {
			await dropAllCollections()
			await mongoose.connection.close()
		})
	},
}
