let genders = JSON.parse(localStorage.getItem('genders')) || [];
let groups = JSON.parse(localStorage.getItem('groups')) || [];
let skills = JSON.parse(localStorage.getItem('skills')) || [];

export default {
    userEditForm: {
        model: {
            email: '',
            gender: (genders[0]) ? genders[0].value : null,
            group: (groups[0]) ? groups[0].value : null,
            skills: (skills[1]) ? [skills[1].value] : [],
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
                    options: genders,
                    validate: {
                        required: true
                    }
                },
                {
                    type: 'radio',
                    label: 'Select your group',
                    name: 'group',
                    model: 'group',
                    options: groups,
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
                    label: 'Username',
                    name: 'username',
                    placeholder: 'Enter your username',
                    model: 'username',
                    validate: {
                        required: true
                    }
                },                
                {
                    type: 'input',
                    inputType: 'input',
                    label: 'Telephone',
                    name: 'telephone',
                    placeholder: 'Enter your phone number',
                    model: 'telephone',
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
                    type: 'select',
                    label: 'Skills',
                    model: 'skills',
                    name: 'skills',
                    placeholder: 'Select skills',
                    options: skills,
                    validate: {
                        required: true,
                        included: (skills[1]) ? [skills[0].value, skills[1].value] : null
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