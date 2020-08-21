import express from 'express'

import signup from '../controllers/signup.js'


const router = express.Router()

router.route('/').post(signup)

export default router