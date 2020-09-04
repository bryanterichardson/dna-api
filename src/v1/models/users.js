import * as bcrypt from '../../helpers/bcrypt.js'
import { Model } from '../../helpers/pg.js'
import Like from './likes.js'
import Post from './posts.js'
import PostsThreads from './postsThreads.js'
import PostsThreadsLikes from './postsThreadsLikes.js'


class UserModel extends Model {
    async create(email, password){
        const user = {}
        user.email = email
        user.encrypted_password = await bcrypt.genPasswordHash(password)
        user.role_id = 1  // Client
        user.can_post = false
        user.email_verified = false
        return super.create(user)
    }

    getByEmail(email) {
        return this.query()
            .select()
            .from(this.tableName)
            .where({email})
            .limit(1)
    }

    getLikesByUserId(user_id, like_type) {
        if (like_type === 'thread') {
            return PostsThreadsLikes.getByUserId(user_id)
        } else if (like_type === 'reply') {
            return ThreadRepliesLikes.getByUserId(user_id)
        }
        return Like.getByUserId(user_id)
    }

    getPostsByUserId(user_id, post_type) {
        if (post_type === 'thread') {
            return PostsThreads.getByUserId(user_id)
        } else if (post_type === 'reply') {
            return ThreadReplies.getByUserId(user_id)
        }
        return Post.getByUserId(user_id)
    }
}

const User = new UserModel('users')

export default User
