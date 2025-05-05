import { Router } from 'express';
const router = Router();
import { getthoughts, getSinglethoughts, createthoughts, updatethoughts, deletethoughts, addthoughtsResponse, removethoughtsResponse } from '../../controllers/thoughtsController.js';
// /api/thoughts
router.route('/').get(getthoughts).post(createthoughts);
// /api/thoughts/:thoughtsId
router
    .route('/:thoughtsId')
    .get(getSinglethoughts)
    .put(updatethoughts)
    .delete(deletethoughts);
// /api/thoughts/:thoughtsId/responses
router.route('/:thoughtsId/responses').post(addthoughtsResponse);
// /api/thoughts/:thoughtsId/responses/:responseId
router.route('/:thoughtsId/responses/:responseId').delete(removethoughtsResponse);
export default router;
