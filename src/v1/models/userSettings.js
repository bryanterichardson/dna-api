import { Model } from '../../helpers/pg.js'


class UserSettingsModel extends Model {}

const UserSettings = new UserSettingsModel('user_settings')

export default UserSettings