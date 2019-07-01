import notificationReducer from './notificationReducer'
import anecdoteReducer from './anecdoteReducer'
import { combineReducers } from 'redux'


const reducer = combineReducers({
    notification: notificationReducer,
    anecdotes: anecdoteReducer,
})

export default reducer