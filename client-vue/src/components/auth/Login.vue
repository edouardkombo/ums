<template>
    <div>
        <vue-form-builder
            ref="form"
            v-model="model"
            :schema="schema"
            :options="schema.formOptions"
            @action="onAction"
        ></vue-form-builder>
        <!-- <pre></pre> -->
    </div>
</template>

<script>
import 'vfc/dist/vfc.css';
import { Input } from 'vfc';

export default {
    data () {
        return {
            model: {
                email: 'john.doe@gmail.com',
                password: 'Password'
            },
            schema: {
                fields: [
                    {
                        type: 'input',
                        inputType: 'input',
                        label: 'Email',
                        name: 'email',
                        placeholder: 'Type email',
                        model: 'email',
                        validate: {
                            required: true,
                            email: true
                        }
                    },
                    {
                        type: 'input',
                        inputType: 'password',
                        label: 'Password',
                        name: 'password',
                        placeholder: 'Type password',
                        model: 'password',
                        validate: {
                            required: true
                        }
                    }
                ],
                formOptions: {
                    labelPosition: 'right',
                    labelWidth: '120px'
                }
            }
        }
    },

    components: {
        [Input.name]: Input
    },

    methods: {
        async onAction (e) {
            if (e.type === 'submit') {
                const res = await this.$refs.form.$validator.validate()
                if (res) alert('Form is valid')
            }
        }
    }
}
</script>
