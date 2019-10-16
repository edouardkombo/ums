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
                            type: 'submit',
                            buttonType: 'success',
                            buttonLabel: 'Login'
                        },
                        {
                            type: 'button',
                            buttonType: 'warning',
                            buttonLabel: 'Register'
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