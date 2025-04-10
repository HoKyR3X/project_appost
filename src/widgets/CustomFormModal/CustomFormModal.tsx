import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { arrowBackOutline, checkmarkOutline, closeOutline } from "ionicons/icons";
import { ReactNode,useCallback,useRef } from "react";
import { useTranslation } from "react-i18next";
import { Sizes } from "../../models/index";

type Props = {
    isOpen: boolean;
    title: string;
    size?: Sizes;
    children?: ReactNode;
    buttonType?: "submit" | "reset" | "button";
    buttonText?: string;
    buttonForm?: string;
    buttonDisabled?: boolean;
    onDismiss: () => void;
}

export const CustomFormModal = ({isOpen, title, size = 'sm', children, buttonType, buttonText, buttonForm, buttonDisabled, onDismiss}: Props) => {
    const modal = useRef<HTMLIonModalElement>(null);
    const { t } = useTranslation();

    const handleDismiss = useCallback(() => {
        modal.current?.dismiss();

        onDismiss();
    }, [onDismiss]);

    return (
        <IonModal className={`${size && 'ion-modal-' + size}`} ref={modal} isOpen={isOpen} onWillDismiss={() => handleDismiss()}>
            <IonHeader className="ion-no-border ion-padding">
                <IonToolbar>
                    <IonTitle className="p-0">
                        <h3>{t(title)}</h3>
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton shape="round" onClick={() => handleDismiss()}>
                            <IonIcon icon={closeOutline} color="dark"></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding-horizontal">
                <>{children}</>
            </IonContent>
            <IonFooter className="ion-no-border ion-padding">
                <IonToolbar>
                    <div className="d-flex justify-content-between">
                        <IonButton color="medium" onClick={() => handleDismiss()}>
                            <IonIcon slot="start" icon={arrowBackOutline}></IonIcon>
                            {t('COMMON.LABELS.CANCEL')}
                        </IonButton>
                        {
                            buttonText
                                ? <IonButton color="primary" fill="solid" type={buttonType} form={buttonForm || ''} className="ms-3" disabled={buttonDisabled}>
                                    <IonIcon slot="end" icon={checkmarkOutline}></IonIcon>
                                    {t(buttonText)}
                                </IonButton>
                                : ''
                        }
                    </div>
                </IonToolbar>
            </IonFooter>
        </IonModal>
    );
}