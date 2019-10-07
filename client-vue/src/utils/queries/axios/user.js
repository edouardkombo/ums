import { ENTRYPOINT } from '../../../config/entrypoint';
import axios from 'axios';

const jsonHeaders = {
    headers: {
        'Content-Type': 'application/json',
    }
};

function setAvatar(response) {
    let fullPicture = ENTRYPOINT + response.data.contentUrl;
    localStorage.setItem('user_avatar', fullPicture);
    return fullPicture;
};

//Get all genders, groups and skills
export default  {
    login (credentials, context, cb = null) {
        axios.post(
            ENTRYPOINT + '/auth',
            credentials,
            jsonHeaders
        )
        .then((response) => {
            if (response.status < 200 || response.status >= 300) {
                context.flash('Invalid credentials!', 'error', {
                    timeout: 3000
                });

                return false;
            }

            context.flash('Successful login!', 'success', {
                timeout: 2000,
                beforeDestroy() {
                    let token = response.data.token;
                    localStorage.setItem('token', token);

                    //Set Bearer token for all upcoming requests
                    axios.interceptors.request.use(function (config) {
                        config.headers.Authorization = token ? `Bearer ${token}` : '';
                        return config;
                    });

                    //Perform some actions like get User details and redirect user
                    cb();
                }
            });
        })
        .catch((err) => {
            context.flash(err, 'error', {
                timeout: 3000
            });
        });
    },
    
    signup (data, context, cb = null) {
        axios.post(
            ENTRYPOINT + '/users',
            data,
            jsonHeaders
        )
        .then((response) => {
            if (response.status < 200 || response.status >= 300) {
                context.flash('AN error occured, please try again later!', 'error', {
                    timeout: 3000
                });

                return false;
            }

            context.flash('User successfully created !', 'success', {
                timeout: 2000,
                beforeDestroy() {
                    //Perform some actions like get User details and redirect user
                    cb();
                }
            });
        })
        .catch((err) => {
            context.flash(err, 'error', {
                timeout: 3000
            });
        });
    },

    update(data, context) {
        axios.put(
            ENTRYPOINT + '/users/me',
            data,
            jsonHeaders
        )
        .then((response) => {
            if (response.status < 200 || response.status >= 300) {
                context.flash('Unabe to fetch current user data, please try again later!', 'error', {
                    timeout: 3000
                });

                return false;
            }

            context.flash('User successfully updated !', 'success', {
                timeout: 2000
            });
        })
        .catch((err) => {
            context.flash(err, 'error', {
                timeout: 3000
            });
        });
    },

    me(context, cb) {
        axios.get(ENTRYPOINT + '/users/me')
        .then((response) => {
            if (response.status < 200 || response.status >= 300) {
                context.flash('Unabe to fetch current user data, please try again later!', 'error', {
                    timeout: 3000
                });

                return false;
            }

            localStorage.setItem('user', JSON.stringify(response.data));

            cb();
        })
        .catch((err) => {
            context.flash(err, 'error', {
                timeout: 3000
            });
        });
    },

    uploadImage(data, context, cb) {
        axios.post(
            ENTRYPOINT + '/media_objects',
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        )
        .then((response) => {
            if (response.status < 200 || response.status >= 300) {
                context.flash('Unabe to fetch current user data, please try again later!', 'error', {
                    timeout: 3000
                });

                return false;
            }

            cb(response.data['@id'], setAvatar(response));
        })
        .catch((err) => {
            context.flash(err, 'error', {
                timeout: 3000
            });
        });
    },


    addImageToUser(data, context, cb) {
        axios.put(
            ENTRYPOINT + '/users/me',
            {
                image: data
            },
            jsonHeaders
        )
        .then((response) => {
            if (response.status < 200 || response.status >= 300) {
                context.flash('Unabe to fetch current user data, please try again later!', 'error', {
                    timeout: 3000
                });

                return false;
            }

            cb();
        })
        .catch((err) => {
            context.flash(err, 'error', {
                timeout: 3000
            });
        });
    },

    getMediaUrl(id, context, cb) {
        axios.get(ENTRYPOINT + '/media_objects/' + id)
        .then((response) => {
            if (response.status < 200 || response.status >= 300) {
                context.flash('Unabe to fetch current user data, please try again later!', 'error', {
                    timeout: 3000
                });

                return false;
            }

            cb(setAvatar(response));
        })
        .catch((err) => {
            context.flash(err, 'error', {
                timeout: 3000
            });
        });
    },

    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('user_avatar');
        
        window.location.reload();        
    }
};