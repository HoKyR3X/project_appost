import { IonIcon, IonTextarea } from "@ionic/react";
import { TextareaConfig } from "../models/index.ts";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { closeOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";

export function CustomTextarea(config: TextareaConfig) {
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
        <IonTextarea
            mode="md"
            placeholder={t(config.placeholder || '')}
            className={`${isValid && 'ion-valid'} ${!isValid && errorMessage && 'ion-invalid ion-touched'} ${config.class}`}
            label={t(config.label) + (config?.validation?.required?.value ? '*' : '')} 
            labelPlacement={config.labelPlacement} 
            fill={config.fill}
            errorText={errorMessage}
            autoGrow={config.autoGrow}
            rows={config.rows || 3}
            maxlength={config.maxLength}
            counter={!!config.maxLength}
            counterFormatter={(inputLength, maxLength) => t('COMMON.LABELS.CHARACTERS_REMAINING', { characters: (maxLength - inputLength) })}
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
        </IonTextarea>
    )
};