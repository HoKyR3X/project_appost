import { IonButton, IonHeader, IonIcon, IonToolbar } from "@ionic/react";
import { logOutOutline, trashOutline } from "ionicons/icons";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRootDispatch, useRootSelector } from "../store/hooks";
import { CustomAlert, CustomAvatar } from "../widgets/index";
import { deleteUser, logout } from "../pages/Auth/store/auth";
import { EditUser } from "../pages/Auth/components";
import { DELETE_USER_ALERT_CONFIG } from "../pages/Auth/consts";

export const UserHeader = () => {
    const dispatch = useRootDispatch();
    
    const { t } = useTranslation();
    
    const currentUser = useRootSelector(state => state.auth.currentUser);

    const [editUserData, setEditUser] = useState<any>({user: currentUser, isOpen: false});
    const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState<any>(false);

    const handleClickLogoutButton = () => {
        dispatch(logout());
    }

    const handleDismissDeleteAlert = useCallback((event: CustomEvent) => {
        const role = event.detail?.role || '';

        if (role === 'delete' && currentUser?.id) 
            dispatch(deleteUser(currentUser?.id));

        setIsOpenDeleteAlert(false);
    }, [dispatch, currentUser?.id]);

    return (
        <>
            <IonHeader className="ion-no-border custom-border-bottom py-2">
                <IonToolbar className="px-2">
                    <div slot="start">
                        <CustomAvatar
                            floatIcon={trashOutline}
                            floatIconColor="danger"
                            onClickFloatIcon={() => setIsOpenDeleteAlert(true)}>
                        </CustomAvatar>
                    </div>
                    <div className="ms-3">
                        <h6 className="text-capitalize m-0">{currentUser?.name}</h6>
                        <IonButton
                            fill="clear"
                            size="small"
                            className="m-0 no-padding"
                            color="dark"
                            onClick={() => setEditUser({user: currentUser, isOpen: true})}>
                            {t('USERS.MY_PROFILE')}
                        </IonButton>
                    </div>
                    <IonButton onClick={() => handleClickLogoutButton()} slot="end" fill="clear" size="small" className="m-0 no-padding" color="danger">
                        <IonIcon slot="icon-only" icon={logOutOutline} className="fs-4 cursor-pointer"></IonIcon>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <EditUser
                {...editUserData}
                onDismiss={() => setEditUser({user: currentUser, isOpen: false})}
                onDelete={() => setIsOpenDeleteAlert(true)}>
            </EditUser>
            <CustomAlert
                isOpen={isOpenDeleteAlert}
                options={DELETE_USER_ALERT_CONFIG}
                onDismiss={(event) => handleDismissDeleteAlert(event)}>
            </CustomAlert>
        </>
    );
}