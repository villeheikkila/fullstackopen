
export const createNotification = (content, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: { message: content.message, type: content.type }
        })
        setTimeout(() => {
            dispatch({
                type: 'DELETE_NOTIFICATION',
            })
        }, time * 1000)
    }
}

export const deleteNotification = () => {
    return {
        type: 'DELETE_NOTIFICATION',
    }
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
    case 'SET_NOTIFICATION':
        return action.data
    case 'DELETE_NOTIFICATION':
        return ''
    default:
        return state
    }
}

export default notificationReducer