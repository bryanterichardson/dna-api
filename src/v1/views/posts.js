import viewHandler from "../../helpers/viewHandler.js"

const postViewSchema = {
    id: '*',
    user_id: '*',
    post_id: '*',
    content: '*',
    is_visible: ['admin'],
    created_at: '*',
    updated_at: '*'
}

const postView = viewHandler(postViewSchema)

export default postView
