import { InputConfig, TextareaConfig } from "../../../models/index";

export const ADD_EDIT_POST_FORM: (InputConfig | TextareaConfig)[] = [
    {
        ...new InputConfig(),
        name: 'title',
        type: 'text',
        label: 'POSTS.COMMON.FIELDS.TITLE',
        validation: {
            required: {
                value: true,
                message: 'COMMON.ERRORS.REQUIRED'
            }
        }
    },
    {
        ...new TextareaConfig(),
        name: 'body',
        label: 'POSTS.COMMON.FIELDS.BODY',
        class: 'mt-3',
        maxLength: 500,
        validation: {
            required: {
                value: true,
                message: 'COMMON.ERRORS.REQUIRED'
            }
        }
    },
];

export const DELETE_POST_ALERT_CONFIG = {
    header: 'POSTS.DELETE_POST_TITLE',
    message: 'POSTS.DELETE_POST_WARNING',
    buttons: [
        {
          text: 'COMMON.LABELS.CANCEL',
          role: 'cancel',
          cssClass: 'ion-text-medium'
        },
        {
          text: 'COMMON.LABELS.DELETE',
          role: 'delete',
          cssClass: 'ion-text-danger'
        }
    ]
}