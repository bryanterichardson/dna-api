import debug from 'debug'

import { jwtVerify } from '../../helpers/jwt.js'
import * as responseCodes from '../../helpers/responseCodes.js'
import User from '../models/users.js'


const debug_logger = debug('app:auth:middleware')

export default async (req, res, next) => {
    const auth = req.headers.authorization || req.body.token
    debug_logger('authorization: ', auth)
    if (!auth) { responseCodes.status404(res) }
    let token = auth.split(' ')
    token = token[token.length-1]

    try {
        req.user = await jwtVerify(token)
    } catch (e) {
        req.user = null
    }
    debug_logger('decoded token: ', req.user)

    if (!req.user) {
        responseCodes.status401(res)
    }

    try {
        const result = await User.getById(req.user.userId)
        const user = result[0] || {}
        req.user.role = user.role
        debug_logger('updated token: ', req.user)
        next()
    } catch(e) {
        responseCodes.status404(res)
    }
}