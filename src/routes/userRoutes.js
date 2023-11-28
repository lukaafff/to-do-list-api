import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import checkToken from '../middlewares/authMiddleware.js'

const userRoutes = Router()

userRoutes.get('/:id', checkToken, UserController.getUserById);
userRoutes.put('/:id', checkToken, UserController.updateUser);
userRoutes.delete('/:id', checkToken, UserController.deleteUser);

export default userRoutes;
