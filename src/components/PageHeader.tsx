import { IonButton, IonHeader, IonIcon, IonMenuToggle, IonProgressBar, IonTitle, IonToolbar } from "@ionic/react";
import { listOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useRootSelector } from "../store/hooks";

type Props = {
    title: string;
}

export const PageHeader = memo(({title}: Props) => {
    const { t } = useTranslation();

    const isLoadingPosts = useRootSelector(state => state.post.isLoading);
    const isLoadingUsers = useRootSelector(state => state.auth.isLoading);

    const hasLoading = [isLoadingPosts, isLoadingUsers].some(loading => loading);

    return (
        <IonHeader className="ion-no-border custom-border-bottom align-content-center">
            <IonToolbar className="h-100 d-flex">
                <IonMenuToggle slot="start">
                    <IonButton color="dark" fill="clear" className="align-self-center">
                        <IonIcon slot="icon-only" icon={listOutline}></IonIcon>
                    </IonButton>
                </IonMenuToggle>
                <IonTitle>
                    <h1 className="m-0 text-uppercase">{t(title)}</h1>
                </IonTitle>
                {
                    hasLoading
                        ? <IonProgressBar slot="end" type="indeterminate"></IonProgressBar>
                        : ''
                }
            </IonToolbar>
        </IonHeader>
    );
});