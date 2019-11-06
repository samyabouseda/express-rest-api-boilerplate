import 'dotenv/config'

const env = process.env.NODE_ENV // 'development' or 'test' or 'production'

const base = {
	port: process.env.PORT,
}

const development = {
	name: 'development',
}

const test = {
	name: 'test',
}

const production = {
	name: 'production',
}

const config = {
	development,
	test,
	production,
}

module.exports = { ...base, ...config[env] }
