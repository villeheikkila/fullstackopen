import usersService from '../services/users'

export const initializeUsers = () => {
    return async dispatch => {
        const users = await usersService.getAll()
        console.log('uadssadasdsers: ', users)
        dispatch({
            type: 'INIT_USERS',
            data: users,
        })
    }
}

const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT_USERS':
        return action.data
    default:
        return state
    }
}

export default blogReducer