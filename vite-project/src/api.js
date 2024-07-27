// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true, // Include cookies in requests
});

export default api;
