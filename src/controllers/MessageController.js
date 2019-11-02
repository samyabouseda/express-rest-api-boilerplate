import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
	const messages = await req.context.models.Message.find()
	return res.send(messages)
})

router.get('/:messageId', async (req, res) => {
	const message = await req.context.models.Message.findById(
		req.params.messageId,
	)
	return res.send(message)
})

const createPost = async (req, res) => {
	try {
		const message = await req.context.models.Message.create({
			text: req.body.text,
			user: req.body.id,
		})
		return res.status(201).json({
			message,
		})
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}

router.post('/', createPost)

router.delete('/:messageId', async (req, res) => {
	const message = await req.context.models.Message.findById(
		req.params.messageId,
	)
	let result = null
	if (message) {
		result = await message.remove()
	}
	return res.send(result)
})

export default router
