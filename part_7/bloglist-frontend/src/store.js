
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store