import thunk from 'redux-thunk'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notifyReducer'
import blogReducer from './reducers/blogReducer' 
import userReducer from './reducers/userReducer' 
import usersReducer from './reducers/usersReducer' 

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
  users: usersReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
