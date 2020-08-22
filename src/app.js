import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'

import mainRouter from './v1/routers/apiv1.js'
import loginRouter from './v1/routers/login.js'
import signupRouter from './v1/routers/signup.js'


const createApp = () => {
    const app = express()

    // Middleware
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    app.use(cookieParser())
    app.use(morgan('tiny'))
    app.use((req, res, next) => {
        delete req.body.id
        delete req.body.encrypted_password
        delete req.body.created_at
        delete req.body.updated_at
        next()
    })

    // Routers
    app.use('/login', loginRouter)
    app.use('/signup', signupRouter)
    app.use('/api/v1', mainRouter)
    return app
}

export default createApp
