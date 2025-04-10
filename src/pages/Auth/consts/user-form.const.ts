import { FormConfig, InputConfig, InputIcon, SelectConfig } from "../../../models/index";
import { atOutline, maleFemaleOutline, personOutline } from "ionicons/icons";

export const ADD_EDIT_USER_FORM: FormConfig[] = [
    {
        ...new InputConfig(),
        name: 'name',
        label: 'COMMON.FIELDS.NAME',
        validation: {
            required: {
                value: true,
                message: 'COMMON.ERRORS.REQUIRED'
            }
        },
        iconStart: {
            ...new InputIcon(),
            icon: personOutline,
        }
    },
    {
        ...new InputConfig(),
        name: 'email',
        type: 'email',
        label: 'COMMON.FIELDS.EMAIL',
        class: 'mt-4',
        validation: {
            required: {
                value: true,
                message: 'COMMON.ERRORS.REQUIRED'
            },
            pattern: {
                value: /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                message: 'COMMON.ERRORS.PATTERN'
            },
        },
        iconStart: {
            ...new InputIcon(),
            icon: atOutline,
        }
    },
    {
        ...new SelectConfig(),
        name: 'gender',
        label: 'COMMON.FIELDS.GENDER',
        placeholder: 'COMMON.PLACEHOLDERS.GENDER',
        class: 'mt-4',
        validation: {
            required: {
                value: true,
                message: 'COMMON.ERRORS.REQUIRED'
            }
        },
        iconStart: {
            ...new InputIcon(),
            icon: maleFemaleOutline,
        },
        options: [
            {value: 'male', label: 'COMMON.LABELS.MALE'},
            {value: 'female', label: 'COMMON.LABELS.FEMALE'}
        ]
    }
];