import { IonIcon, IonInput, IonInputPasswordToggle } from "@ionic/react";
import { InputConfig } from "../models/index.ts";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { closeOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";

export function CustomInput(config: InputConfig) {
    const { register, formState: { errors } } = useFormContext();
    const error = errors?.[config.name]?.message as string;

    const { t } = useTranslation();

    useEffect(() => {
        setIsValid(!error);
        setErrorMessage(!error ? '' : t(error));
    }, [error, t]);

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(true);

    return (
        <IonInput
            mode="md"
            placeholder={t(config.placeholder || '')}
            className={`${isValid && 'ion-valid'} ${!isValid && errorMessage && 'ion-invalid ion-touched'} ${config.class}`}
            label={t(config.label) + (config?.validation?.required?.value ? '*' : '')} 
            labelPlacement={config.labelPlacement} 
            fill={config.fill}
            errorText={errorMessage}
            {...register(config.name, config.validation)}>
            {
                config.iconStart
                    ? <IonIcon slot="start" 
                        icon={isValid ? config.iconStart.icon : closeOutline} 
                        color={isValid ? config.iconStart.color : 'danger'} 
                        className={config.iconStart.class}>
                    </IonIcon>
                    : ''
            }
            {
                config.showTogglePassword && config.type === 'password'
                    ? <IonInputPasswordToggle slot="end" color="dark"></IonInputPasswordToggle>
                    : ''
            }
        </IonInput>
    )
};