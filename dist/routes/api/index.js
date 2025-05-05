import { Router } from 'express';
const router = Router();
import thoughtsRoutes from './thoughtsRoutes.js';
import userRoutes from './userRoutes.js';
import friendsRoutes from './friendsRoutes.js';
router.use('/friends', friendsRoutes); // Ensure the path matches
router.use('/thoughts', thoughtsRoutes);
router.use('/users', userRoutes);
export default router;
