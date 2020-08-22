import { Model } from '../../helpers/pg.js'


class PostModel extends Model {}

const Post = new PostModel('posts')

export default Post
