import viewHandler from "../../helpers/viewHandler.js"

const likeViewSchema = {
    user_id: '*',
    post_thread_id: '*',
    created_at: '*',
    updated_at: '*'
}

const likeView = viewHandler(likeViewSchema)

export default likeView
