import { InputValidators, VALIDATORS } from "../models/index";

export const customFieldValidation = (validators: InputValidators, value: string) => { // TODO: Remember do this better
    let hasError: boolean = false;
    let message: string = '';

    Object.keys(validators).forEach(key => {
        if (message) return;

        const currentValidator = validators[key];

        switch(key) {
            case VALIDATORS.REQUIRED: {
                if (!value) {
                    hasError = true;
                    message = currentValidator.message;
                }
            }
            break;
            case VALIDATORS.PATTERN: {
                const match = value.match(currentValidator.value as RegExp);

                if (!match) {
                    hasError = true;
                    message = currentValidator.message;
                }
            }
            break;
        }

        return currentValidator;
    });

    return {hasError, message};
}

export const getErrorFields = (errors: any, errorLabels: any) => {
    return errors.map((error: any) => {
        const cleanMessage = error.message.replaceAll(' ', '_').toUpperCase();
        const message = errorLabels?.[error.field]?.[cleanMessage];

        return {...error, message};
    });
}