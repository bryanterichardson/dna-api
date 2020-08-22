import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'

import mainRouter from './v1/routers/apiv1.js'
import authenticate from './v1/middleware/auth.js'
import loginRouter from './v1/routers/login.js'
import signupRouter from './v1/routers/signup.js'


const createApp = () => {
    const app = express()

    // Middleware
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    app.use(cookieParser())
    app.use(morgan('tiny'))

    // Routers
    app.use('/login', loginRouter)
    app.use('/signup', signupRouter)
    app.use('/api/v1', authenticate, mainRouter)
    return app
}

export default createApp
