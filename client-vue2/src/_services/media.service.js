import config from 'config';
import axios from 'axios';
import { authHeader } from '../_helpers';

export const mediaService = {
    upload,
    getUrl
};

function upload(data) {
    return axios.post(`${config.apiUrl}/media_objects`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

function getUrl(mediaId) {
    return axios.get(`${config.apiUrl}/${mediaId}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}