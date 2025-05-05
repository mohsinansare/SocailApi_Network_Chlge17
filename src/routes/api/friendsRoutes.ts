import { Router } from 'express';
import { addFriend, removeFriend } from '../../controllers/userController.js';

const router = Router();

// Route to add a friend
router.post('/:userId/:friendId', addFriend);

// Route to remove a friend
router.delete('/:userId/:friendId', removeFriend);

export default router;