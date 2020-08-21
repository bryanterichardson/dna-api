import debug from 'debug'

// import * as bcrypt from '../../helpers/bcrypt.js' -- handled in user model
import { jwtSign } from '../../helpers/jwt.js'
import * as responseCodes from '../../helpers/responseCodes.js'
import User from '../models/users.js'


const logger = debug('app:auth:controller')


export default async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return responseCodes.status400(res)
    }

    const results = await User.getByEmail(email)
    if (results[0]) { return responseCodes.status400(res, {exists: true}) }

    try {
        const result = await User.create(email, password)
        const user = result[0]
        const token = await jwtSign({userId: user.id})
        return responseCodes.status200(res, {token})
    } catch (e) {
        return responseCodes.status500(res, {error: e.toString()})
    }
}