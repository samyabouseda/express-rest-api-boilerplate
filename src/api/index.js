import { Router } from 'express'
import { UserController, MessageController } from '../controllers'

const routes = Router()

routes.use('/users', UserController)
routes.use('/messages', MessageController)

routes.get('/', (req, res) => {
	res.status(200).json({ message: 'Connected' })
})

export default routes
