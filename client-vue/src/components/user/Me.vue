<template>
    <div class="main">
        <div class="container">
            <div class="row my-2">
                <div class="col-lg-8 order-lg-2">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a href="" data-target="#profile" data-toggle="tab" class="nav-link active">Profile</a>
                        </li>
                        <li class="nav-item">
                            <a href="" data-target="#messages" data-toggle="tab" class="nav-link">Messages</a>
                        </li>
                        <li class="nav-item">
                            <a href="" data-target="#edit" data-toggle="tab" class="nav-link">Edit</a>
                        </li>
                    </ul>
                    <div class="tab-content py-4">
                        <div class="tab-pane active" id="profile">
                            <h5 class="mb-3">User Profile</h5>
                            <div class="row">
                                <div class="col-md-6">
                                    <p>
                                        I am a great entrepreneur, but before everything, I am so passionate by my job.
                                    </p>
                                </div>
                                <div class="col-md-6">
                                    <h6>Recent badges</h6>
                                    <a href="#" class="badge badge-dark badge-pill">html5</a>
                                    <a href="#" class="badge badge-dark badge-pill">react</a>
                                    <a href="#" class="badge badge-dark badge-pill">codeply</a>
                                    <a href="#" class="badge badge-dark badge-pill">angularjs</a>
                                    <a href="#" class="badge badge-dark badge-pill">css3</a>
                                    <a href="#" class="badge badge-dark badge-pill">jquery</a>
                                    <a href="#" class="badge badge-dark badge-pill">bootstrap</a>
                                    <a href="#" class="badge badge-dark badge-pill">responsive-design</a>
                                    <hr>
                                    <span class="badge badge-primary"><i class="fa fa-user"></i> 900 Followers</span>
                                    <span class="badge badge-success"><i class="fa fa-cog"></i> 43 Forks</span>
                                    <span class="badge badge-danger"><i class="fa fa-eye"></i> 245 Views</span>
                                </div>
                                <div class="col-md-12">
                                    <h5 class="mt-2"><span class="fa fa-clock-o ion-clock float-right"></span> Recent Activity</h5>
                                    <table class="table table-sm table-hover table-striped">
                                        <tbody>                                    
                                            <tr>
                                                <td>
                                                    <strong>Abby</strong> joined ACME Project Team in <strong>`Collaboration`</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Gary</strong> deleted My Board1 in <strong>`Discussions`</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Kensington</strong> deleted MyBoard3 in <strong>`Discussions`</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>John</strong> deleted My Board1 in <strong>`Discussions`</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Skell</strong> deleted his post Look at Why this is.. in <strong>`Discussions`</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!--/row-->
                        </div>
                        <div class="tab-pane" id="messages">
                            <div class="alert alert-info alert-dismissable">
                                <a class="panel-close close" data-dismiss="alert">×</a> This is an <strong>.alert</strong>. Use this to show important messages to the user.
                            </div>
                            <table class="table table-hover table-striped">
                                <tbody>                                    
                                    <tr>
                                        <td>
                                        <span class="float-right font-weight-bold">3 hrs ago</span> Here is your a link to the latest summary report from the..
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span class="float-right font-weight-bold">Yesterday</span> There has been a request on your account since that was..
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span class="float-right font-weight-bold">9/10</span> Porttitor vitae ultrices quis, dapibus id dolor. Morbi venenatis lacinia rhoncus. 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span class="float-right font-weight-bold">9/4</span> Vestibulum tincidunt ullamcorper eros eget luctus. 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span class="float-right font-weight-bold">9/4</span> Maxamillion ais the fix for tibulum tincidunt ullamcorper eros. 
                                        </td>
                                    </tr>
                                </tbody> 
                            </table>
                        </div>
                        <div 
                            class="tab-pane" 
                            id="edit"
                            v-if="true === formData.populated"
                        >
                            <vue-form-builder
                                ref="update"
                                v-model="form.signup.model"
                                :schema="form.signup.schema"
                                :options="form.signup.schema.formOptions"
                                @action="onAction"
                            ></vue-form-builder>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 order-lg-1 text-center">
                    <div class="logout-button">
                        <div>{{ user.firstname}} {{ user.lastname }}</div>
                    </div>
                    <img :src="user.avatar" class="mx-auto img-fluid img-circle d-block" alt="avatar" width="150px" height="150px">
                    <h6 class="mt-2">{{ messages.avatar.title }}</h6>
                    <label class="custom-file">
                        <input type="file" id="file" class="custom-file-input" accept="image/*" @change="uploadImage($event)">
                        <span class="custom-file-control">{{ messages.avatar.action }}</span>
                    </label>
                    <div class="logout-button">
                        <div
                            @click="logout()" 
                            class='btn btn-danger'
                        >
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'vfc/dist/vfc.css';
import { Input } from 'vfc';
import gqlQuery from '../../utils/queries/gql/preLogin';
import axiosQueries from '../../utils/queries/axios/user';
import authForm from '../../utils/forms/authForm';
import { ENTRYPOINT } from '../../config/entrypoint';
import gql from 'graphql-tag';

export default {
    data () {
        return {
            user: {
                avatar: '//placehold.it/150',
                firstname: '',
                lastname: '',
            },
            messages: {
                avatar: {
                    title: "Upload a different photo",
                    action: "Choose file",
                }
            },
            form: authForm,
            formData: {
                populated: false
            }
        }
    },

    components: {
        [Input.name]: Input
    },

    methods: {
        getProfileAvatar() {
            let avatar = "//placehold.it/150";
            if (localStorage.getItem('user_avatar') !== null) {
                avatar = localStorage.getItem('user_avatar');
            } else {
                let user = JSON.parse(localStorage.getItem('user'));
                let mediaObjectId = (null !== user.image) ? user.image.split('/')[2] : null;

                if (null !== mediaObjectId) {
                    axiosQueries.getMediaUrl(mediaObjectId, this, (url) => {
                        this.$set(this.user, 'avatar', url);
                        return avatar = url;
                    })
                }
            }

            return avatar;
        },

        uploadImage(event) {
            let data = new FormData();
            data.append('name', 'my-picture');
            data.append('file', event.target.files[0]); 

            axiosQueries.uploadImage(data, this, (id, url) => {
                axiosQueries.addImageToUser(id, this, () => {
                    this.$set(this.user, 'avatar', url);
                })
            });
        },

        async onAction (e) {
            if (e.type === 'submit') {
                const res = await this.$refs.update.$validator.validate();

                if (!res) {
                    return false;
                }

                axiosQueries.update(this.form.signup.model, this);
            }
        },

        logout() {
            axiosQueries.logout(this);
        }
    },

    mounted () {
        this.$set(this.user, 'avatar', this.getProfileAvatar());

        //this.form = authForm;

        let genders = JSON.parse(localStorage.getItem('genders'));
        let groups = JSON.parse(localStorage.getItem('groups'));
        let skills = JSON.parse(localStorage.getItem('skills'));
        let user = JSON.parse(localStorage.getItem('user'));

        this.$set(this.user, 'firstname', user.firstname);
        this.$set(this.user, 'lastname', user.lastname);

        this.$set(this.form.signup.schema.fields[0], 'options', genders);
        this.$set(this.form.signup.schema.fields[1], 'options', groups);

        this.$set(this.form.signup.schema.fields[9], 'options', skills);
        this.$set(this.form.signup.schema.fields[9].validate, 'included', [skills[0].value, skills[1].value]);

        //Get Default values
        for (let field in user) {
            if (this.form.signup.model[field] !== undefined) {
                this.$set(this.form.signup.model, field, user[field]);
            }
        }

        this.$set(this.formData, 'populated', true);
    },
}
</script>
<style lang="scss">
body {
    background: #fff;    
}

.container {
    width: 100%;
}

.custom-file-input {
    background-color: grey !important;
    padding: 5px !important;
    margin-bottom: 10px !important;
}

.logout-button {
    margin-top: 25px; 
}
</style>