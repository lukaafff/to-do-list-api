import { Router } from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import taskRoutes from './taskRoutes.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'API login e registro' });
});

router.use('/auth', authRoutes); 
router.use('/user', userRoutes); 
router.use('/task', taskRoutes);

export default router;
