import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://localhost:3333'
    baseURL: 'https://arcane-depths-49398.herokuapp.com'
});

export default api;