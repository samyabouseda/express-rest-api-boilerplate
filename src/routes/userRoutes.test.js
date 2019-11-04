import app from '../app'
import supertest from 'supertest'
import { setupDB } from '../test-setup'
import User from '../models/User'
import { CREATED, NO_CONTENT, NOT_FOUND, OK } from 'http-status-codes'

const request = supertest(app)
const DUMMY_USER = { username: 'John Doe' }

setupDB('users')

describe('User endpoint', () => {
	it('should create a new  user', async done => {
		const response = await request.post('/users').send({
			username: DUMMY_USER.username,
		})
		const { user } = response.body
		expect(response.status).toEqual(CREATED)
		expect(response.body).toHaveProperty('user')
		expect(user.username).toBe(DUMMY_USER.username)
		done()
	})

	it('should fetch a single user', async done => {
		const user = await User.create({
			username: DUMMY_USER.username,
		})
		const response = await request.get(`/users/${user.id}`)
		const fetchedUser = response.body.user
		expect(response.status).toEqual(OK)
		expect(fetchedUser.username).toBe(DUMMY_USER.username)
		done()
	})

	it('should fetch all users', async done => {
		const user1 = await User.create({
			username: DUMMY_USER.username,
		})
		const user2 = await User.create({
			username: 'Tupac',
		})
		const response = await request.get('/users')
		const { users } = response.body
		expect(response.body).toHaveProperty('users')
		expect(response.status).toEqual(OK)
		expect(users[0].username).toBe(user1.username)
		expect(users[1].username).toBe(user2.username)
		done()
	})

	it('should update a user', async done => {
		const user = await User.create({
			username: DUMMY_USER.username,
		})
		const response = await request.put(`/users/${user.id}`).send({
			username: 'Thomas Shelby',
		})
		expect(response.status).toEqual(OK)
		expect(response.body.user.username).toEqual('Thomas Shelby')
		done()
	})

	it('should delete a user', async done => {
		const user = await User.create({
			username: DUMMY_USER.username,
		})
		const response = await request.delete(`/users/${user.id}`)
		expect(response.status).toEqual(NO_CONTENT)
		const userFound = await User.findById(user.id)
		expect(userFound).toBe(null)
		done()
	})

	it('should return status code 404 when user does NOT exist', async done => {
		const response = await request.get('/users/100')
		expect(response.status).toEqual(NOT_FOUND)
		done()
	})
})
