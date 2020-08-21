export const HiddenPost = (req, hiddenPost) => {
    if (Array.isArray(hiddenPost)){
        return hiddenPost.map((item) => {
            return HiddenPost(item)
        })
    }
    const cleanedHiddenPost = {}
    cleanedHiddenPost.id = hiddenPost.id
    cleanedHiddenPost.user_id = hiddenPost.user_id
    cleanedHiddenPost.post_id = hiddenPost.post_id
    cleanedHiddenPost.created_at = hiddenPost.created_at
    cleanedHiddenPost.updated_at = hiddenPost.updated_at
    return cleanedHiddenPost
}

export const Like = (req, like) => {
    if (Array.isArray(like)){
        return like.map((item) => {
            return Like(item)
        })
    }
    const cleanedLike = {}
    cleanedLike.id = like.id
    cleanedLike.user_id = like.user_id
    cleanedLike.post_id = like.post_id
    cleanedLike.created_at = like.created_at
    cleanedLike.updated_at = like.updated_at
    return cleanedLike
}

export const Post = (req, post) => {
    if (Array.isArray(post)){
        return post.map((item) => {
            return Post(item)
        })
    }
    const cleanedPost = {}
    cleanedPost.id = post.id
    cleanedPost.user_id = post.user_id
    cleanedPost.content = post.content
    cleanedPost.is_visible = post.is_visible
    cleanedPost.created_at = post.created_at
    cleanedPost.updated_at = post.updated_at
    return cleanedPost
}

export const Reply = (req, reply) => {
    if (Array.isArray(reply)){
        return reply.map((item) => {
            return Reply(item)
        })
    }
    const cleanedReply = {}
    cleanedReply.id = reply.id
    cleanedReply.user_id = reply.user_id
    cleanedReply.post_id = reply.post_id
    cleanedReply.content = reply.content
    cleanedReply.is_visible = reply.is_visible
    cleanedReply.is_visible_to_author = reply.is_visible_to_author
    cleanedReply.curated_visibility = reply.curated_visibility
    cleanedReply.created_at = reply.created_at
    cleanedReply.updated_at = reply.updated_at
    return cleanedReply
}

export const UserSettings = (req, userSetting) => {
    if (Array.isArray(userSetting)){
        return userSetting.map((item) => {
            return UserSettings(item)
        })
    }
    const cleanedUserSettings = {}
    cleanedUserSettings.user_id = userSetting.user_id
    cleanedUserSettings.post_id = userSetting.settings
    cleanedUserSettings.updated_at = userSetting.updated_at
    return cleanedUserSettings
}


export const User = (req, user) => {
    if (Array.isArray(user)){
        return user.map((item) => {
            return User(item)
        })
    }
    const cleanedUser = {}
    if (req.user.role === 'admin'){
        cleanedUser.can_post = user.can_post
    }

    if (req.user.role === 'admin' || req.user.userId === user.id){
        cleanedUser.email = user.email
        cleanedUser.email_verified = user.email_verified
        cleanedUser.role = user.role
    }

    cleanedUser.id = user.id
    cleanedUser.created_at = user.created_at
    cleanedUser.updated_at = user.updated_at

    return cleanedUser
}