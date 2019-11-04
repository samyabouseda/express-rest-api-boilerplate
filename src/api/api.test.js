import app from '../app'
import supertest from 'supertest'

const request = supertest(app)

describe('API', () => {
	it('is connected', async done => {
		const response = await request.get('/')
		expect(response.status).toBe(200)
		expect(response.body.message).toBe('Connected')
		done()
	})
})
