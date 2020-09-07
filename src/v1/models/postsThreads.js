import { Model } from '../../helpers/pg.js'


class PostsThreadsModel extends Model {
    create (user_id, {content, is_visible}) {
        const post = {}
        post.user_id = user_id
        post.content = content
        post.is_visible = !!is_visible
        return super.create(post)
    }

    deleteById(user_id, id){
        return super.deleteById(id)
            .where({user_id})
    }

    updateById(user_id, id, {content, is_visible}){
        const post = {}
        post.content = content
        post.is_visible = !!is_visible
        return super.updateById(id, post)
            .where({user_id})
    }
}

const PostsThreads = new PostsThreadsModel('posts_threads')

export default PostsThreads
