<template>
    <div 
        class="main"
        v-if="'object' === typeof form.object"
    >
        <h1>{{messages[form.type].title }}</h1>
        <div class="container">
            <div class="auth-content">
                <div>
                    <vue-form-builder
                        :ref="form.type"
                        v-model="form.object.model"
                        :schema="form.object.schema"
                        :options="form.object.schema.formOptions"
                        @action="onAction"
                    ></vue-form-builder>
                    <!-- <pre></pre> -->
                    <p class="auth-switch">
                        {{ messages[form.type].question }} 
                        <a 
                            v-on:click="toggleVar(!toggle.signup)" 
                            class="auth-switch-link"
                        > 
                            {{ messages[form.type].action }}
                        </a>
                    </p>
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
            messages: {
                signup: {
                    question: 'Already have an account ?',
                    action: 'Log in',
                    title: 'Sign Up'
                },
                login: {
                    question: 'Not a member yet ?',
                    action: 'Sign up',
                    title: 'Log in'
                },
            },
            toggle: {
                signup: false
            },
            form: {
                type: '',
                object: ''
            },
        }
    },

    components: {
        [Input.name]: Input
    },

    methods: {
        toggleVar(state) {
            this.$set(this.toggle, 'signup', state);
            this.$set(this.form, 'type', (!state) ? 'login' : 'signup');
            this.$set(this.form, 'object', (!state) ? authForm.login : authForm.signup);
        },

        async onAction (e) {
            if (e.type === 'submit') {
                const res = await this.$refs[this.form.type].$validator.validate();
                if (!res) {
                    return false;
                }

                if ('signup' === this.form.type) {
                    this.form.object.model.skills = [this.form.object.model.skills];
                }

                axiosQueries[this.form.type](this.form.object.model, this, () => {
                    if ('login' === this.form.type) {
                        axiosQueries.me(this, () => {
                            this.$router.push('/user/me');
                        });
                    } else if ('signup' === this.form.type) {
                        this.toggleVar(false);
                    }
                });
            }
        }
    },

    mounted () {
        this.$set(this.form, 'type', 'login');
        this.$set(this.form, 'object', authForm.login);
    },

    apollo: {
        // Get all genders, groups and skills for signup
        collection_query_genders_groups_skills: {
            query: () => gqlQuery.preLogin,
            variables() {
                return {}
            },
            result ({ data, loading, networkStatus }) {
                if (7 === networkStatus && !loading) {
                    let genders = data.genders.edges.map(el => ({value: el.node.id, label: el.node.name}));
                    let groups = data.groups.edges.map(el => ({value: el.node.id, label: el.node.name}));
                    let skills = data.skills.edges.map(el => ({value: el.node.id, label: el.node.name}));

                    localStorage.setItem('genders', JSON.stringify(genders));
                    localStorage.setItem('groups', JSON.stringify(groups));
                    localStorage.setItem('skills', JSON.stringify(skills));

                    this.$set(authForm.signup.schema.fields[0], 'options', genders);
                    this.$set(authForm.signup.schema.fields[1], 'options', groups);

                    this.$set(authForm.signup.schema.fields[9], 'options', skills);
                    this.$set(authForm.signup.schema.fields[9].validate, 'included', [skills[0].value, skills[1].value]);

                    //set Default values
                    this.$set(authForm.signup.model, 'gender', genders[0].value);
                    this.$set(authForm.signup.model, 'group', groups[0].value);
                    this.$set(authForm.signup.model, 'skills', [skills[0].value]);
                }
            },
            error (error) {
                this.flashError(error);
            }
        }
    },
}
</script>
<style lang="scss">
body {
    background-image: url("https://twu.edu/media/images/center-women-entrepreneurs/CWB-Hero---1440px.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;    
}
.main a.auth-switch-link {
    text-decoration: underline;
    cursor: pointer;
    color: red;
}
.main h1 {
    top: -23px;
    opacity: 0.7;
}
</style>