import express from 'express'

import * as userController from '../controllers/users.js'


const router = express.Router()

// Routes
router.route('/')
    .post(userController.createUser)

router.route('/:id')
    .get(userController.getUserById)
    .put(userController.updateUserById)
    .delete(userController.deleteUserById)

router.route('/:id/likes')
    .get(userController.getUserLikes)

// router.route('/:id/posts')
//     .get(userController.getUserPosts)

// router.route('/:id/threads')
//     .get(userController.getUserThreads)
//
// router.route('/:id/replies')
//     .get(userController.getUserReplies)

export default router
