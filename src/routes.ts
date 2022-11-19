import { Router } from 'express'
import { UserController } from './controllers/UserController'
import multer from './middlewares/multer'

const routes = Router()

routes.post('/users', multer.single('image'),  new UserController().create)
routes.get('/users', new UserController().get)

export default routes