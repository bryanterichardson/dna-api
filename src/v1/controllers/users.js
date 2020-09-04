import debug from 'debug'

import * as responseCodes from "../../helpers/responseCodes.js"
import viewHandler from "../../helpers/viewHandler.js"
import User from '../models/users.js'
import likeViewSchema from '../views/likes.js'
import postViewSchema from '../views/posts.js'
import postThreadViewSchema from '../views/postsThreads.js'
import userViewSchema from '../views/users.js'


const debug_logger = debug('app:user:controller')
const likeView = viewHandler(likeViewSchema)
const postView = viewHandler(postViewSchema)
const postThreadView = viewHandler(postThreadViewSchema)
const userView = viewHandler(userViewSchema)


export const createUser = async (req, res) => {
    if (req.user.role_name !== 'admin'){
        return responseCodes.status401(res)
    }
    if (!req.body.password) {
        return responseCodes.status400(res)
    }
    try {
        const result = await User.create(req.body.email, req.body.password)
        userView(req.user.role_name, result)
        let user = result[0] || {}
        return responseCodes.status200(res, {user})
    } catch (e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const deleteUserById = async (req, res) => {
    if (req.user.role_name !== 'admin'){
        return responseCodes.status401(res)
    }
    try {
        const result = await User.deleteById(req.params.id)
        userView(req.user.role_name, result)
        let user = result[0] || {}
        return responseCodes.status200(res, {user})
    } catch (e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const getUserById = async (req, res) => {
    try {
        const result = await User.getById(req.params.id)
        userView(req.user.role_name, result)
        let user = result[0] || {}
        if (user) { return responseCodes.status200(res, {user}) }
        return responseCodes.status404(res)
    } catch (e) {
            return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const getUserLikes = async (req, res) => {
    if (!['admin', 'self'].includes(req.user.role_name)) {
        return responseCodes.status401(res)
    }
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1
        const result = await User
            .getLikesByUserId(req.params.id)
            .orderBy('created_at', 'desc')
            .paginate({perPage: 10, currentPage: page})
        likeView(req.user.role_name, result)
        let likes = result.data || []
        if (likes) { return responseCodes.status200(res, {likes}) }
        return responseCodes.status404(res)
    } catch(e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const getUserPosts = async (req, res) => {
    if (!['admin', 'self'].includes(req.user.role_name)) {
        return responseCodes.status401(res)
    }
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1
        const result = await User
            .getPostsByUserId(req.params.id)
            .orderBy('created_at', 'desc')
            .paginate({perPage: 10, currentPage: page})
        postView(req.user.role_name, result)
        let posts = result.data || []
        if (posts) { return responseCodes.status200(res, {posts}) }
        return responseCodes.status404(res)
    } catch(e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const getUserThreads = async (req, res) => {
    if (!['admin', 'self'].includes(req.user.role_name)) {
        return responseCodes.status401(res)
    }
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1
        const result = await User
            .getThreadsByUserId(req.params.id)
            .orderBy('created_at', 'desc')
            .paginate({perPage: 10, currentPage: page})
        postThreadView(req.user.role_name, result)
        let threads = result.data || []
        if (threads) { return responseCodes.status200(res, {threads}) }
        return responseCodes.status404(res)
    } catch(e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const updateUserById = async (req, res) => {
    if (!['admin', 'self'].includes(req.user.role_name)) {
        return responseCodes.status401(res)
    }
    try {
        const result = await User.updateById(req.params.id, req.body)
        userView(req.user.role_name, result)
        let user = result[0] || {}
        return responseCodes.status200(res, {user})
    } catch(e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}
