import viewHandler from "../../helpers/viewHandler.js"

const postThreadViewSchema = {
    id: '*',
    user_id: '*',
    post_id: '*',
    content: '*',
    is_visible: ['admin'],
    is_visible_to_author: ['admin'],
    created_at: '*',
    updated_at: '*'
}

const postThreadView = viewHandler(postThreadViewSchema)

export default postThreadView
