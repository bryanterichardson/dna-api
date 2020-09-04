import express from 'express'

import * as responseCodes from '../../helpers/responseCodes.js'
import authenticate from '../middleware/auth.js'
import postRouter from './posts.js'
import userRouter from './users.js'


const router = express.Router()

// Middleware
router.use(authenticate)

// Health check
router.get('/health', (req, res) => {
    return responseCodes.status200(res, {ok: true})
})

// Routes
router.use('/posts', postRouter)
router.use('/users', userRouter)

export default router
