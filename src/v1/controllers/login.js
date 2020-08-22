import debug from 'debug'

import * as bcrypt from '../../helpers/bcrypt.js'
import { jwtSign } from '../../helpers/jwt.js'
import * as responseCodes from '../../helpers/responseCodes.js'
import User from '../models/users.js'


const debug_logger = debug('app:auth:controller')


const login = async (req, res) => {
    debug_logger('LOGIN req.body: ', req.body)
    const { email, password } = req.body
    if (!email || !password) {
        return responseCodes.status400(res)
    }

    const results = await User.getByEmail(email)
    debug_logger('LOGIN Query results: ', results[0])
    if (!results[0]) { return responseCodes.status404(res) }

    try {
        const user = results[0]
        const giveToken = await bcrypt.comparePasswordHash(password, user.encrypted_password)
        if (!giveToken) { return responseCodes.status401(res) }
        const token = await jwtSign({userId: user.id})
        return responseCodes.status200(res, {token})
    } catch (e) {
        return responseCodes.status400(res)
    }
}

export default login
