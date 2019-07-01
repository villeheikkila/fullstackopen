import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getOne = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}/`)
    return response.data
}


const create = async (data) => {
    console.log('data: ', data);
    const response = await axios.post(baseUrl, data)
    return response.data
}

const incrementLikes = async (id) => {
    const old = await getOne(id)
    old.votes = old.votes + 1
    const response = await axios.put(`${baseUrl}/${id}/`, old)
    return response.data
}

export default { getAll, create, incrementLikes }