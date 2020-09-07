import express from 'express'

import * as postThreadController from '../controllers/postsThreads.js'


const router = express.Router()

// Routes
router.route('/:id')
    .get(postThreadController.getThreadById)
    .put(postThreadController.updateThreadById)
    .delete(postThreadController.deleteThreadById)

router.route('/:id/like')
    .post(postThreadController.likeThread)
    .delete(postThreadController.unlikeThread)

export default router
