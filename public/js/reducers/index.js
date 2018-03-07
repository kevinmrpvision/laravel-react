import { combineReducers } from "redux"

import users from "./UsersReducer"
import articles from "./ArticlesReducer"

export default combineReducers({
    users,
    articles
})
