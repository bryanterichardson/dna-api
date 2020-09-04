import express from 'express'

import * as postController from '../controllers/posts.js'


const router = express.Router()

// Routes
router.route('/')
    .get(postController.getPosts)
    .post(postController.createPost)

router.route('/:id')
    .get(postController.getPostById)
    .put(postController.updatePostById)
    .delete(postController.deletePostById)

router.route('/:id/threads')
    .get(postController.getPostThreads)
    .post(postController.createPostThread)

export default router
