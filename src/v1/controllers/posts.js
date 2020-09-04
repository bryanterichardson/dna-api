import debug from 'debug'

import * as responseCodes from "../../helpers/responseCodes.js"
import Post from '../models/posts.js'
import postView from '../views/posts.js'
import postThreadView from '../views/postsThreads.js'


const debug_logger = debug('app:post:controller')


export const createPost = async (req, res) => {
    try {
        const result = await Post.create(req.user.userId, req.body)
        postView(req.user.role_name, result)
        let post = result[0] || {}
        return responseCodes.status200(res, {post})
    } catch (e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const deletePostById = async (req, res) => {
    try {
        const result = await Post.deleteById(req.user.userId, req.params.id)
        postView(req.user.role_name, result)
        let post = result[0] || {}
        return responseCodes.status200(res, {post})
    } catch (e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const getPosts = async (req, res) => {  // TODO
    // Bulk of feed logic here maybe?
    // Use created_at and page query for pagination
    try {
        return responseCodes.status200(res, {ok: true})
    } catch (e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const getPostById = async (req, res) => {
    try {
        const result = await Post.getById(req.params.id)
        postView(req.user.role_name, result)
        let post = result[0] || {}
        if (post) { return responseCodes.status200(res, {post}) }
        return responseCodes.status404(res)
    } catch (e) {
            return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const getPostThreads = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1
        const result = await Post
            .getThreadsByPostId(req.params.id)
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

export const updatePostById = async (req, res) => {
    try {
        const result = await Post.updateById(req.user.userId, req.params.id, req.body)
        postView(req.user.role_name, result)
        let post = result[0] || {}
        return responseCodes.status200(res, {post})
    } catch(e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}
