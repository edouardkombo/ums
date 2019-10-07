import React from 'react';
import { HydraAdmin, hydraClient as hydra, fetchHydra as baseFetchHydra } from '@api-platform/admin';
import authProvider from './authProvider';
import { Admin } from 'react-admin';
import LoginPage from './LoginPage';
import LogoutButton from './LogoutButton';

const entrypoint = 'http://185.247.117.219:8080'; // Change this by your own entrypoint
const fetchHeaders = {'Authorization': `Bearer ${window.localStorage.getItem('token')}`};
const fetchHydra = (url, options = {}) => baseFetchHydra(url, {
    ...options,
    headers: new Headers(fetchHeaders),
});
const hydraClient = api => hydra(api, fetchHydra);

const theme =     <Admin loginPage={LoginPage} logoutButton={LogoutButton} authProvider={authProvider} dataProvider={hydraClient}>
    <HydraAdmin entrypoint={process.env.REACT_APP_API_ENTRYPOINT}/>
</Admin>;

authProvider('AUTH_CHECK', '');

//<HydraAdmin entrypoint={process.env.REACT_APP_API_ENTRYPOINT}/>
export default () => theme;
