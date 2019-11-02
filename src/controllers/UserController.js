import { Router } from 'express'

const router = Router()

const createUser = async (req, res) => {
	try {
		const user = await req.context.models.User.create({
			username: req.body.username,
		})
		return res.status(201).json({
			user,
		})
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}

// TODO: Add example for put method
// const updateUser = async (req, res) => {
// 	try {
// 	} catch (error) {
// 		return res.status(500).json({ error: error.message })
// 	}
// }

const getUsers = async (req, res) => {
	try {
		const users = await req.context.models.User.find()
		return res.status(200).json({
			users,
		})
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}

const getUserById = async (req, res) => {
	try {
		const user = await req.context.models.User.findById(
			req.params.userId,
		)
		return res.status(200).json({ user })
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}

const deleteUser = async (req, res) => {
	try {
		const user = await req.context.models.User.findByIdAndDelete(
			req.params.userId,
		)
		return res.status(204).json({
			success: `User with id ${user.id} deleted successfully!`,
		})
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}

router.post('/', createUser)
// router.put('/', updateUser)
router.get('/', getUsers)
router.get('/:userId', getUserById)
router.delete('/:userId', deleteUser)

export default router
