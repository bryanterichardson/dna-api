import * as bcrypt from '../../helpers/bcrypt.js'
import { Model } from '../../helpers/pg.js'
import Like from './likes.js'
import Post from './posts.js'
import UserSettings from './userSettings.js'


class UserModel extends Model {
    async create(email, password){
        const user = {}
        user.email = email
        user.encrypted_password = await bcrypt.genPasswordHash(password)
        user.role = 'client'
        user.can_post = false
        user.email_verified = false
        return super.create(user)
    }

    getByEmail(email) {
        return this.queryBuilder
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

    getSettingsByUserId(user_id) {
        return UserSettings.getByUserId(user_id)
    }
}

const User = new UserModel('users')

export default User