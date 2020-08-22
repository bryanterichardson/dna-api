import { Model } from '../../helpers/pg.js'


class PostsThreadsModel extends Model {}

const PostsThreads = new PostsThreadsModel('posts_threads')

export default PostsThreads
