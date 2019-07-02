import blogService from '../services/blogs'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (data) => {
    return {
        title: data.title,
        author: data.author,
        url: data.url,
        id: getId()
    }
}

export const createBlog = (content) => {
    return async dispatch => {
        const createdBlog = await blogService.create(asObject(content))
        dispatch({
            type: 'NEW_BLOG',
            data: createdBlog
        })
    }
}

export const updateBlog = (blog) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(blog)
        dispatch({
            type: 'UPDATE_BLOG',
            data: updatedBlog
        })
    }
}

export const deleteBlog = (blog) => {
    console.log('blasdsadasdsaog: ', blog)
    return async dispatch => {
        await blogService.remove(blog)
        dispatch({
            type: 'DELETE_BLOG',
            data: blog
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        console.log('blogs: ', blogs)
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}

const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'NEW_BLOG':
        return [...state, action.data]
    case 'UPDATE_BLOG': {
        const updatedBlogs = state.map(b => b.id === action.data.id ? action.data : b)
        return updatedBlogs
    }
    case 'DELETE_BLOG': {
        const newBlogs = state.filter(b => b.id !== action.data.id)
        return newBlogs
    }
    case 'INIT_BLOGS':
        return action.data
    default:
        return state
    }
}

export default blogReducer