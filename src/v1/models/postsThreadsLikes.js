import { Model } from '../../helpers/pg.js'


class PostsThreadsLikesModel extends Model {
    create (user_id, post_thread_id) {
        const like = {}
        like.user_id = user_id
        like.post_thread_id = post_thread_id
        return super.create(like)
    }

    deleteByThreadId(user_id, post_thread_id){
        return super.query()
            .delete()
            .where({user_id, post_thread_id})
    }
}

const PostsThreadsLikes = new PostsThreadsLikesModel('posts_threads_likes')

export default PostsThreadsLikes
