import { Router } from 'express'
import {
	CREATED,
	INTERNAL_SERVER_ERROR,
	OK,
	NO_CONTENT,
} from 'http-status-codes'

const router = Router()

const createUser = async (req, res) => {
	try {
		const user = await req.context.models.User.create({
			username: req.body.username,
		})
		return res.status(CREATED).json({
			user,
		})
	} catch (error) {
		return res
			.status(INTERNAL_SERVER_ERROR)
			.json({ error: error.message })
	}
}

const updateUser = async (req, res) => {
	const { userId } = req.params
	const updatedUser = req.body
	try {
		await req.context.models.User.findByIdAndUpdate(
			userId,
			{ ...updatedUser },
			{ new: true },
			(err, user) => {
				if (err) {
					console.log(err)
					res.status(INTERNAL_SERVER_ERROR).json({
						error: error.message,
					})
				} else {
					res.status(OK).json({ user })
				}
			},
		)
	} catch (error) {
		return res
			.status(INTERNAL_SERVER_ERROR)
			.json({ error: error.message })
	}
}

const getUsers = async (req, res) => {
	try {
		const users = await req.context.models.User.find()
		return res.status(OK).json({
			users,
		})
	} catch (error) {
		return res
			.status(INTERNAL_SERVER_ERROR)
			.json({ error: error.message })
	}
}

const getUserById = async (req, res) => {
	try {
		const user = await req.context.models.User.findById(
			req.params.userId,
		)
		return res.status(OK).json({ user })
	} catch (error) {
		return res
			.status(INTERNAL_SERVER_ERROR)
			.json({ error: error.message })
	}
}

const deleteUser = async (req, res) => {
	try {
		const user = await req.context.models.User.findByIdAndDelete(
			req.params.userId,
		)
		return res.status(NO_CONTENT).json({
			success: `User with id ${user.id} deleted successfully!`,
		})
	} catch (error) {
		return res
			.status(INTERNAL_SERVER_ERROR)
			.json({ error: error.message })
	}
}

router.post('/', createUser)
router.get('/', getUsers)
router.get('/:userId', getUserById)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router
