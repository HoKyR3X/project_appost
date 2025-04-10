import { InputConfig, InputIcon } from "../../../models/index";
import { atOutline, personOutline } from "ionicons/icons";

export const LOGIN_FORM: InputConfig[] = [
    {
        ...new InputConfig(),
        name: 'name',
        type: 'text',
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
    }
];