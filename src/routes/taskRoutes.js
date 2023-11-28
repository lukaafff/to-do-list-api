import { Router } from 'express';
import taskController from '../controllers/TaskController.js'
import checkToken from '../middlewares/authMiddleware.js'

const taskRoutes = Router()

taskRoutes.get('/:userId', checkToken, taskController.getTasksByUserId);
taskRoutes.post('/:userId', checkToken, taskController.createTask); 
taskRoutes.delete('/:userId/:taskId', checkToken, taskController.deleteTask);
taskRoutes.put('/:userId/:taskId', checkToken, taskController.updateTask);

export default taskRoutes;
