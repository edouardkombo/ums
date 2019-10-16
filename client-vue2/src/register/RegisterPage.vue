<template>
    <div class="jumbotron">
        <h2>Register</h2>
        <vue-form-builder
            v-if="typeof form === 'object'"
            ref="create"
            v-model="form.model"
            :schema="form.schema"
            :options="form.schema.formOptions"
            @action="onAction"
        />
        <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
    </div>
</template>

<script>
import 'vfc/dist/vfc.css';
import { Input } from 'vfc';
import forms from '../_forms/user-create-form';
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            form: ''
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    mounted () {
        let genders = JSON.parse(localStorage.getItem('genders'));
        let groups = JSON.parse(localStorage.getItem('groups'));
        let skills = JSON.parse(localStorage.getItem('skills'));    
    
        //Set Default values
        this.$set(forms.userCreateForm.schema.fields[0], 'options', genders);
        this.$set(forms.userCreateForm.schema.fields[1], 'options', groups);

        this.$set(forms.userCreateForm.schema.fields[10], 'options', skills);
        this.$set(forms.userCreateForm.schema.fields[10].validate, 'included', [skills[0].value, skills[1].value]);

        //set Default values
        this.$set(forms.userCreateForm.model, 'gender', genders[0].value);
        this.$set(forms.userCreateForm.model, 'group', groups[0].value);
        this.$set(forms.userCreateForm.model, 'skills', [skills[0].value]);        
        
        this.form = forms.userCreateForm;
    },
    methods: {
        ...mapActions('account', ['register']),
        async onAction (e) {
            if (e.type === 'submit') {
                const res = await this.$refs.create.$validator.validate();

                if (!res) {
                    return false;
                }

                this.register(this.form.model);
            
            } else if (e.type === 'cancel') {
                this.$router.push('/login');
            }
        },
    }
};
</script>