require('dotenv').config()

const env = process.env.NODE_ENV // 'development', 'test' or 'production'

const DEFAULT_WEB_PORT = 8080
const DEFAULT_DB_PORT = 27017

const base = {
	// YOUR BASE CONFIG HERE
}

const development = {
	configId: 'development',
	app: {
		port: parseInt(process.env.DEV_APP_PORT) || DEFAULT_WEB_PORT
	},
	db: {
		host: process.env.DEV_DB_HOST || 'localhost',
		port: parseInt(process.env.DEV_DB_PORT) || DEFAULT_DB_PORT,
		name: process.env.DEV_DB_NAME || 'db'
	}
}

const test = {
	configId: 'test',
	app: {
		port: parseInt(process.env.TEST_APP_PORT) || DEFAULT_WEB_PORT
	},
	db: {
		host: process.env.TEST_DB_HOST || 'localhost',
		port: parseInt(process.env.TEST_DB_PORT) || DEFAULT_DB_PORT,
		name: process.env.TEST_DB_NAME || 'test'
	}
}

const production = {
	configId: 'production',
	app: {
		port:  parseInt(process.env.PORT)
	},
	db: {
		host: process.env.PROD_DB_HOST,
		port: parseInt(process.env.PROD_DB_PORT) || DEFAULT_DB_PORT,
		name: process.env.PROD_DB_NAME || 'production',
	}
}

const config = {
	development,
	test,
	production
}

module.exports = { ...base, ...config[env] }