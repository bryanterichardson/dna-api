import debug from 'debug'

import * as clean from "../../helpers/cleaner.js"
import * as responseCodes from "../../helpers/responseCodes.js"
import User from '../models/users.js'


const debug_logger = debug('app:user:controller')


export const createUser = async (req, res) => {
    if (req.user.role !== 'admin'){
        return responseCodes.status401(res)
    }
    if (!req.body.password) {
        return responseCodes.status400(res)
    }
    try {
        const result = await User.create(req.body.email, req.body.password)
        let user = result[0] || {}
        user = clean.User(req, user)
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
        let user = result[0] || {}
        user = clean.User(req, user)
        return responseCodes.status200(res, {user})
    } catch (e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const getUserById = async (req, res) => {
    try {
        const result = await User.getById(req.params.id)
        let user = result[0] || {}
        user = clean.User(req, user)
        if (user) { return responseCodes.status200(res, {user}) }
        return responseCodes.status404(res)
    } catch (e) {
            return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const getUserLikes = async (req, res) => {
    if (req.user.role !== 'admin' && req.params.id !== req.user.id){
        return responseCodes.status401(res)
    }
    try {
        const result = await User.getLikesByUserId(req.params.id)
        let likes = result || []
        likes = clean.Like(req, likes)
        if (likes) { return responseCodes.status200(res, {likes}) }
        return responseCodes.status404(res)
    } catch(e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const getUserPosts = async (req, res) => {
    if (req.user.role !== 'admin' && req.params.id !== req.user.id){
        return responseCodes.status401(res)
    }
    try {
        const result = await User.getPostsByUserId(req.params.id)
        let posts = result || []
        posts = clean.Post(req, posts)
        if (posts) { return responseCodes.status200(res, {posts}) }
        return responseCodes.status404(res)
    } catch(e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

// export const getUserReplies = async (req, res) => {
//     if (req.user.role !== 'admin' && req.params.id !== req.user.id){
//         return responseCodes.status401(res)
//     }
//     try {
//         const result = await User.getRepliesByUserId(req.params.id)
//         let replies = result.rows || []
//         replies = clean.Reply(req, replies)
//         if (replies) { return responseCodes.status200(res, {replies}) }
//         return responseCodes.status404(res)
//     } catch(e) {
//         return responseCodes.status400(res, {errorDesc: e.toString()})
//     }
// }

export const getUserSettings = async (req, res) => {
    if (req.user.role !== 'admin' && req.params.id !== req.user.id){
        return responseCodes.status401(res)
    }
    try {
        const result = await User.getSettingsByUserId(req.params.id)
        let settings = result[0] || {}
        settings = clean.UserSettings(req, settings)
        if (settings) { return responseCodes.status200(res, {settings}) }
        return responseCodes.status404(res)
    } catch(e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}

export const updateUserById = async (req, res) => {
    if (req.user.role !== 'admin' && req.params.id !== req.user.id){
        return responseCodes.status401(res)
    }
    try {
        const result = await User.updateById(req.params.id, req.body)
        let user = result[0] || {}
        user = clean.User(req, user)
        return responseCodes.status200(res, {user})
    } catch(e) {
        return responseCodes.status400(res, {errorDesc: e.toString()})
    }
}
