import app from '../app'
import supertest from 'supertest'
import { setupDB } from '../test-setup'

const request = supertest(app)

setupDB('users')

describe('User endpoint', () => {
	it('should create a new  user', async done => {
		const response = await request.post('/users').send({
			username: 'John Doe',
		})
		const { user } = response.body
		expect(response.status).toEqual(201)
		expect(response.body).toHaveProperty('user')
		expect(user.username).toBe('John Doe')
		done()
	})
})
