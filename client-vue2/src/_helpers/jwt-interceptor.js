        
import axios from 'axios'

let user = JSON.parse(localStorage.getItem('user')) || null;
let token = (null !== user) ? user.token : null;

//Set Bearer token for all upcoming requests
axios.interceptors.request.use(function (config) {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});
