import { IonButton, IonCol, IonIcon, IonRow, IonText } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { memo } from "react";

import './CustomEmptyState.css';

type Props = {
    centered: boolean;
    icon?: string;
    header: string
    text: string;
    buttonColor?: string; 
    buttonIcon?: string;
    buttonText?: string;
    onButtonClick?: () => void
}

export const CustomEmptyState = memo(({centered, icon, header, text, buttonColor, buttonIcon, buttonText, onButtonClick}: Props) => {
    const { t } = useTranslation();

    return(
        <>
            <div className={`${centered && 'position-absolute empty-state'}`}>
                <IonRow className="text-center">
                    <IonCol size="12">
                        {icon ? <IonIcon icon={icon}></IonIcon> : ''}
                        <h4>{t(header)}</h4>
                        <IonText color="dark">
                            <div>{t(text)}</div>
                        </IonText>
                        {
                            buttonText
                                ? <IonButton color={buttonColor} className="mt-3" onClick={() => onButtonClick ? onButtonClick() : null}>
                                    {buttonIcon ? <IonIcon slot="start" icon={buttonIcon}></IonIcon> : ''}
                                    {t(buttonText)}
                                </IonButton>
                                : ''
                        }
                    </IonCol>
                </IonRow>
            </div>
        </>
    );
})