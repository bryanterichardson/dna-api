import { Model } from '../../helpers/pg.js'
import PostsThreads from "./postsThreads.js";


class PostModel extends Model {
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

    getPosts(){ // TODO
        return super.find()
    }

    getThreadsByPostId(id){
        return PostsThreads.find([{post_id: id}])
    }

    updateById(user_id, id, {content, is_visible}){
        const post = {}
        post.content = content
        post.is_visible = !!is_visible
        return super.updateById(id, post)
            .where({user_id})
    }
}

const Post = new PostModel('posts')

export default Post
