import debug from 'debug'

import * as responseCodes from "../../helpers/responseCodes.js"
import PostsThreadsLikes from "../models/postsThreadsLikes";
import PostThread from '../models/postsThreads.js'
import postThreadView from '../views/postsThreads.js'
import likeView from '../views/likes.js'


const debug_logger = debug('app:post:controller')


export const deleteThreadById = async (req, res) => {
    try {
        const result = await PostThread.deleteById(req.user.userId, req.params.id)
        postThreadView(req.user.role_name, result)
        let thread = result[0] || {}
        return responseCodes.status200(res, {thread})
    } catch (e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const getThreadById = async (req, res) => {
    try {
        const result = await PostThread.getById(req.params.id)
        postThreadView(req.user.role_name, result)
        let thread = result[0] || {}
        if (thread) { return responseCodes.status200(res, {thread}) }
        return responseCodes.status404(res)
    } catch (e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const likeThread = async (req, res) => {
    try {
        const result = await PostsThreadsLikes.create(req.user.userId, req.params.id)
        likeView(req.user.role_name, result)
        let like = result[0] || {}
        if (like) { return responseCodes.status200(res, {like}) }
        return responseCodes.status404(res)
    } catch (e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const unlikeThread = async (req, res) => {
    try {
        const result = await PostsThreadsLikes.deleteByThreadId(req.user.userId, req.params.id)
        likeView(req.user.role_name, result)
        let like = result[0] || {}
        if (like) { return responseCodes.status200(res, {like}) }
        return responseCodes.status404(res)
    } catch (e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const updateThreadById = async (req, res) => {
    try {
        const result = await PostThread.updateById(req.user.userId, req.params.id, req.body)
        postThreadView(req.user.role_name, result)
        let thread = result[0] || {}
        return responseCodes.status200(res, {thread})
    } catch(e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}
