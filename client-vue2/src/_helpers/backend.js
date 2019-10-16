let token = localStorage.getItem('token');
    
export function configureBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // authenticate
            if (url.endsWith('/auth') && opts.method === 'POST') {
                // get parameters from post request
                let params = JSON.parse(opts.body);

                let responseJson = {
                    id: '',
                    username: '',
                    firstName: '',
                    lastName: '',
                    token: 'jwt-token'
                };
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });

                return;
            }

            // get me
            if (url.endsWith('/users/me') && opts.method === 'GET') {
                // check for auth token in header and return users if valid, this security is implemented server side in a real application
                if (opts.headers && opts.headers.Authorization === `Bearer ${token}`) {
                    resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(''))});
                } else {
                    // return 401 not authorised if token is null or invalid
                    reject('Unauthorised');
                }

                return;
            }

            // register user
            if (url.endsWith('/users') && opts.method === 'POST') {

                // respond 200 OK
                resolve({ ok: true, text: () => Promise.resolve() });

                return;
            }

            // pass through any requests not handled above
            realFetch(url, opts).then(response => resolve(response));
        });
    }
}