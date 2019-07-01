export const createNotification = (content) => {
    return {
        type: 'SET_NOTIFICATION',
        data: content
    }
}
export const deleteNotification = () => {
    return {
        type: 'DELETE_NOTIFICATION',
    }
}

const notificationReducer = (state = "", action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'DELETE_NOTIFICATION':
            return ""
        default:
            return state
    }
}

export default notificationReducer