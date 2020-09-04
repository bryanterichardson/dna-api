import viewHandler from "../../helpers/viewHandler.js"

const userViewSchema = {
    id: '*',
    email: ['self', 'admin'],
    email_verified: ['self', 'admin'],
    encrypted_password: '-',
    role_id: ['admin'],
    can_post: ['admin'],
    created_at: '*',
    updated_at: '*'
}

const userView = viewHandler(userViewSchema)

export default userView
