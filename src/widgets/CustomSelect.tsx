import { IonIcon, IonSelect, IonSelectOption } from "@ionic/react";
import { SelectConfig } from "../models/index.ts";
import { customFieldValidation } from "../functions/index";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function CustomSelect(config: SelectConfig) { // TODO: Very similar to Input.tsx, find a way to remove boilerplate
    const { register, formState: { errors } } = useFormContext();
    const error = errors?.[config.name]?.message as string;

    const { t } = useTranslation();

    useEffect(() => {
        setIsValid(!error);
        setErrorMessage(!error ? '' : t(error));
    }, [error, t]);

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(true);

    const validate = (event: Event) => {
        const value = (event.target as HTMLInputElement).value;

        const {hasError, message} = customFieldValidation(config.validation || {}, value);

        setIsValid(!hasError);
        setErrorMessage(!hasError ? '' : t(message));
    };

    return (
        <IonSelect
            mode="md"
            interface="popover"
            placeholder={t(config.placeholder || '')}
            className={`${isValid && 'ion-valid'} ${!isValid && errorMessage && 'ion-invalid ion-touched'} ${config.class}`}
            label={t(config.label) + (config?.validation?.required?.value ? '*' : '')} 
            labelPlacement={config.labelPlacement} 
            fill={config.fill}
            errorText={errorMessage}
            {...register(config.name, config.validation)}
            onIonChange={(event) => validate(event)}>
            {
                config.iconStart
                    ? <IonIcon slot="start" 
                        icon={config.iconStart.icon} 
                        color={config.iconStart.color} 
                        className={config.iconStart.class}>
                    </IonIcon>
                    : ''
            }
            {
                config.options.map((option, index) => 
                    <IonSelectOption value={option.value} key={index}>{t(option.label)}</IonSelectOption>
                )
            }
        </IonSelect>
    )
};