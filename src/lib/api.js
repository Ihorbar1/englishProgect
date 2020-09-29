import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://tour-back-end.herokuapp.com'
    // baseURL: 'http://192.168.1.106:1337'
    baseURL: 'http://english/server/'
});

export default instance;