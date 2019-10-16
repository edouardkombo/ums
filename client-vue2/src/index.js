import Vue from 'vue';
import config from 'config';

import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';

import VFC from 'vfc';
import axios from 'axios'
import VueAxios from 'vue-axios'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink, concat, split } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo';
import VueFlashMessage from 'vue-flash-message';

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: `${config.apiUrl}/graphql`,
})

function getToken() {
  let user = JSON.parse(localStorage.getItem('user')) || null
  return (null !== user) ? user.token : null;  
}


const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  if (null !== getToken()) {
    operation.setContext({
        headers: {
            authorization: `Bearer ${getToken()}`
        }
    })
  }
  return forward(operation)
})
  
// Cache implementation
const cache = new InMemoryCache()
  
// Create the apollo client
const apolloClient = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache,
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

/** AXIOS CONFIG **/
function errorResponseHandler(error) {
   if (error.response.status === 401) {
      return (router.currentRoute.path === '/login') ? false : router.push('/login');
   }
   let messageContainer = (error.response) ? error.response.data.violations : error.statusText;
   return Promise.reject(messageContainer);
}

// apply interceptor on response
axios.interceptors.response.use(
    response => response,
    errorResponseHandler
);
//Set Bearer token for all upcoming requests
axios.interceptors.request.use(function (config) {
    config.headers.Authorization = getToken() ? `Bearer ${getToken()}` : '';
    return config;
});


Vue.use(VFC);
Vue.use(VueAxios, axios);
Vue.use(VueApollo);
Vue.use(VueFlashMessage);

import { configureBackend } from './_helpers';
configureBackend();

new Vue({
    el: '#app',
    router,
    store,
    apolloProvider,
    render: h => h(App)
});