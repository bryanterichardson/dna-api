import { Model } from '../../helpers/pg.js'


class ThreadRepliesModel extends Model {}

const ThreadReplies = new ThreadRepliesModel('thread_replies')

export default ThreadReplies
