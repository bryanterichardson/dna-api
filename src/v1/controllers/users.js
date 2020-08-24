import debug from 'debug'

import * as responseCodes from "../../helpers/responseCodes.js"
import viewHandler from "../../helpers/viewHandler.js"
import User from '../models/users.js'
import userView from '../views/users.js'


const debug_logger = debug('app:user:controller')
const viewByRole = viewHandler(userView)


export const createUser = async (req, res) => {
    if (req.user.role !== 'admin'){
        return responseCodes.status401(res)
    }
    if (!req.body.password) {
        return responseCodes.status400(res)
    }
    try {
        const result = await User.create(req.body.email, req.body.password)
        viewByRole(req.user.role_name, result)
        let user = result[0] || {}
        return responseCodes.status200(res, {user})
    } catch (e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const deleteUserById = async (req, res) => {
    if (req.user.role !== 'admin'){
        return responseCodes.status401(res)
    }
    try {
        const result = await User.deleteById(req.params.id)
        viewByRole(req.user.role_name, result)
        let user = result[0] || {}
        return responseCodes.status200(res, {user})
    } catch (e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const getUserById = async (req, res) => {
    try {
        const result = await User.getById(req.params.id)
        viewByRole(req.user.role_name, result)
        let user = result[0] || {}
        if (user) { return responseCodes.status200(res, {user}) }
        return responseCodes.status404(res)
    } catch (e) {
            return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const getUserLikes = async (req, res) => {
    if (req.user.role !== 'admin' && req.params.id !== String(req.user.userId)){
        return responseCodes.status401(res)
    }
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1
        const result = await User
            .getLikesByUserId(req.params.id, req.params.type)
            .orderBy('created_at', 'desc')
            .paginate({perPage: 10, currentPage: page})
        viewByRole(req.user.role_name, result)
        let likes = result.data || []
        if (likes) { return responseCodes.status200(res, {likes}) }
        return responseCodes.status404(res)
    } catch(e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const updateUserById = async (req, res) => {
    if (req.user.role !== 'admin' && req.params.id !== String(req.user.userId)){
        return responseCodes.status401(res)
    }
    try {
        const result = await User.updateById(req.params.id, req.body)
        viewByRole(req.user.role_name, result)
        let user = result[0] || {}
        return responseCodes.status200(res, {user})
    } catch(e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}
