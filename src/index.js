import config from '../config'
import connectDb from './database'
import app from './app'

const PORT = config.port

connectDb().then(async () => {
	app.listen(PORT, () =>
		console.log(`Server is running at ${PORT}`),
	)
})
