import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { confirmEmail } from './controllers/confirm-email'
import { getProfile } from './controllers/get-profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.post('/sessions/authentications', confirmEmail)
  app.post('/get-user', getProfile)
}
