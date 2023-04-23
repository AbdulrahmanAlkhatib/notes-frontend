import axios from 'axios'
const baseURL = '/api/login'

const login = async (credintials) => {
    const res = await axios.post(baseURL, credintials)
    return res.data
}

export default { login }