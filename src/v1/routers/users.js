import express from 'express'

import * as userController from '../controllers/users.js'


const router = express.Router()

// Middleware
router.use((req, res, next) => {
    if (req.user.role !== 'admin') {
        delete req.body.role
    }
    next()
})

// Routes
router.route('/')
    .post(userController.createUser)

router.route('/:id')
    .get(userController.getUserById)
    .put(userController.updateUserById)
    .delete(userController.deleteUserById)

router.route('/:id/likes')
    .get(userController.getUserLikes)

router.route('/:id/posts')
    .get(userController.getUserPosts)

// router.route('/:id/replies')
//     .get(userController.getUserReplies)

router.route('/:id/settings')
    .get(userController.getUserSettings)

export default router