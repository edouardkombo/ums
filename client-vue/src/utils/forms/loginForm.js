export default {
    loginForm: {
        model: {
            email: '',
            password: ''
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
                }, 
                {
                    type: 'actions',
                    buttons: [
                        {
                            type: 'cancel',
                            buttonType: 'default',
                            buttonLabel: 'Cancel'
                        },
                        {
                            type: 'submit',
                            buttonType: 'success',
                            buttonLabel: 'Submit'
                        }
                    ]

                }
            ],
            formOptions: {
                labelPosition: 'right',
                labelWidth: '120px'
            }
        }
    }
};