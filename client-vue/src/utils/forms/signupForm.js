export default {
    signupForm: {
        model: {
            email: '',
            password: '',
            passwordConfirm: '',
            gender: 1,
            group: 1,
            skills: [],
            firstname: '',
            lastname:'',
            username: '',
            dob: '',
            telephone: ''
        },
        schema: {
            fields: [
                {
                    type: 'radio',
                    label: 'Select your gender',
                    name: 'gender',
                    model: 'gender',
                    options: [
                        { label: 'label 1', value: 1 },
                        { label: 'label 2', value: 2 },
                        { label: 'label 3', value: 3 }
                    ],
                    validate: {
                        required: true
                    }
                },
                {
                    type: 'radio',
                    label: 'Select your group',
                    name: 'group',
                    model: 'group',
                    options: [
                        { label: 'label 1', value: 1 },
                        { label: 'label 2', value: 2 },
                        { label: 'label 3', value: 3 }
                    ],
                    validate: {
                        required: true
                    }
                },
                {
                    type: 'input',
                    inputType: 'input',
                    label: 'First name',
                    name: 'firstname',
                    placeholder: 'Enter your first name',
                    model: 'firstname',
                    validate: {
                        required: true
                    }
                },
                {
                    type: 'input',
                    inputType: 'input',
                    label: 'Last name',
                    name: 'lastname',
                    placeholder: 'Enter your last name',
                    model: 'lastname',
                    validate: {
                        required: true
                    }
                },
                {
                    type: 'input',
                    inputType: 'input',
                    label: 'Date of birth',
                    name: 'dob',
                    placeholder: 'yyyy/mm/dd',
                    model: 'dob',
                    validate: {
                        required: true
                    }
                },
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
                    type: 'input',
                    inputType: 'password',
                    label: 'Password confirm',
                    name: 'passwordConfirm',
                    placeholder: 'Confirm password',
                    model: 'passwordConfirm',
                    validate: {
                        required: true,
                        confirmed: 'password'
                    }
                },
                {
                    type: 'select',
                    label: 'Skills',
                    model: 'skills',
                    name: 'skills',
                    placeholder: 'Select skills',
                    options: [
                        { label: 'label 1', value: 1 },
                        { label: 'label 2', value: 2 },
                        { label: 'label 3', value: 3 }
                    ],
                    validate: {
                        required: true,
                        included: [1, 2]
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