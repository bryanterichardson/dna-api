import express from 'express'

import * as userController from '../controllers/users.js'


const router = express.Router()

// Middleware
router.param('id', (req, res, next, id) => {
    if (String(id) === String(req.user.userId)) {
        req.user.role_name = 'self'
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

export default router
