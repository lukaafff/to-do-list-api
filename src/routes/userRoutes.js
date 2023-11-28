import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import checkToken from '../middlewares/authMiddleware.js';

const userRoutes = Router();

userRoutes.get('/:userId', checkToken, UserController.getUserById);
userRoutes.put('/:userId', checkToken, UserController.updateUser);
userRoutes.delete('/:userId', checkToken, UserController.deleteUser);

export default userRoutes;
