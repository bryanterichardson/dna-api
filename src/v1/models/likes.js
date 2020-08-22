import { Model } from '../../helpers/pg.js'


class LikeModel extends Model {}

const Like = new LikeModel('likes')

export default Like
