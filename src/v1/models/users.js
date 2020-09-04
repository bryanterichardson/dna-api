import * as bcrypt from '../../helpers/bcrypt.js'
import { Model } from '../../helpers/pg.js'
import Like from './likes.js'
import Post from './posts.js'
import PostsThreads from './postsThreads.js'


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

    getLikesByUserId(user_id) {
        return Like.getByUserId(user_id)
    }

    getPostsByUserId(user_id) {
        return Post.getByUserId(user_id)
    }

    getThreadsByUserId(user_id) {
        return PostsThreads.getByUserId(user_id)
    }
}

const User = new UserModel('users')

export default User
