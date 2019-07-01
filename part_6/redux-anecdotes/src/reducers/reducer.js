import notificationReducer from './notificationReducer'
import anecdoteReducer from './anecdoteReducer'
import filterReducer from './filterReducer'
import { combineReducers } from 'redux'

const reducer = combineReducers({
    notification: notificationReducer,
    anecdotes: anecdoteReducer,
    filter: filterReducer
})

export default reducer