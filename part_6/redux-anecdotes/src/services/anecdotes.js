import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (data) => {
    const response = await axios.post(baseUrl, { anecdote: data })
    return response.data.anecdote
}

export default { getAll, create }