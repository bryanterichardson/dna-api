import express from 'express'

import * as responseCodes from '../../helpers/responseCodes.js'
import userRouter from './users.js'


const router = express.Router()

// Health check
router.get('/health', (req, res) => {
    return responseCodes.status200(res, {ok: true})
})

// Middleware
// Fields that can never be posted manually via API
router.use((req, res, next) => {
    delete req.body.id
    delete req.body.encrypted_password
    delete req.body.created_at
    delete req.body.updated_at
    next()
})

// Routes
router.use('/users', userRouter)

export default router