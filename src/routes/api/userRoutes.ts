import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, updateUser } from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser);

export default router;
