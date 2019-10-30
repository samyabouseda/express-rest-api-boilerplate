import { Router } from 'express'

const routes = Router()

routes.get('/', async (req, res) => {
	const users = await req.context.models.User.find()
	return res.send(users)
})

routes.get('/:userId', async (req, res) => {
	const user = await req.context.models.User.findById(
		req.params.useerId,
	)
	return res.send(user)
})

export default routes
