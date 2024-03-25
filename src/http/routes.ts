import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { confirmEmail } from './controllers/confirm-email'
import { profile } from './controllers/profile'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.post('/sessions/authentications', confirmEmail)

  // Authenticated User
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
