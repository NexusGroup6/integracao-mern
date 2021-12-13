import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
    method: 'post'
});

export default api;