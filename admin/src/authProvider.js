import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS  } from 'react-admin';
import jwt_decode from 'jwt-decode';

export default (type, params) => {

    if (type === AUTH_LOGIN) {
        const { email, password } = params;
        const request = new Request('http://185.247.117.219:8080/auth', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    alert("Invalid Credentials!");
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                const decodedToken = jwt_decode(token);

                let roles = decodedToken.roles;
                if (roles.indexOf('ROLE_ADMIN') < 0) {
                    alert("Only admins can login!");                    
                } else {
                    localStorage.setItem('token', token);
                    localStorage.setItem('role', decodedToken.roles); // The Role is stored in the browser's local storage
                    window.location.replace('/');
                }
            });
    }

    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.replace('/#login');
        return Promise.resolve();
    }

    if (type === AUTH_ERROR) {
        const status  = params.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    }

    if (type === AUTH_CHECK) {
        if (localStorage.getItem('token')) {
            Promise.resolve();
        } else {
            window.location.replace('/#login');
            Promise.reject();
        }
    }

    if (type === AUTH_GET_PERMISSIONS) {
        return localStorage.getItem('role') ? Promise.resolve() : Promise.reject();
    }

    return Promise.resolve('Unknown method');
}