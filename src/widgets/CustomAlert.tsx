import { AlertButton, AlertOptions, IonAlert } from "@ionic/react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    isOpen: boolean;
    options: AlertOptions & {buttons: AlertButton[]};
    onDismiss?: (event: CustomEvent) => void;
}

export const CustomAlert = memo(({isOpen, options: {message, header, buttons = []}, onDismiss}: Props) => {
    const { t } = useTranslation();

    return (
        <IonAlert
            isOpen={isOpen}
            header={header && t(header)}
            message={message && t(message as string)}
            buttons={buttons?.map((button: AlertButton) => ({...button, text: t(button.text)}))}
            onWillDismiss={(event) => onDismiss && onDismiss(event)}>
        </IonAlert>
    );
});