import config from 'config';
import axios from 'axios';
import { authHeader } from '../_helpers';

const jsonHeaders = {
    headers: {
        'Content-Type': 'application/json',
    }
};

export const userService = {
    login,
    logout,
    register,
    getMe,
    update
};

function login(credentials) {
    return axios.post(`${config.apiUrl}/auth`, credentials, jsonHeaders);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    return axios.post(`${config.apiUrl}/users`, user, jsonHeaders); 
}

function getMe() {
    return axios.get(`${config.apiUrl}/users/me`, jsonHeaders); 
}

function update(payload) {
    return axios.put(`${config.apiUrl}/users/me`, payload, jsonHeaders); 
}