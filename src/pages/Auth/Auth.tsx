import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonIcon, IonMenuToggle, IonPage, IonProgressBar, IonRow, IonText, useIonToast } from "@ionic/react";
import { settingsOutline } from "ionicons/icons";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ADD_EDIT_USER_FORM, LOGIN_FORM } from "./consts/index";
import { CustomField } from "../../widgets/index";
import { useRootDispatch, useRootSelector } from "../../store/hooks";
import { createUser, login } from "./store/auth";
import { User } from "./models/index";
import { SideMenu } from "../../components/index";

export function Auth() {
    const dispatch = useRootDispatch();

    const isLoading = useRootSelector(state => state.auth.isLoading);

    const { t } = useTranslation();

    const form = useForm<User>();
    const [presentToast] = useIonToast();

    const [isLogin, setIsLogin] = useState(true);

    const { handleSubmit, setError, reset } = form;

    const handleToggleAuth = () => {
        reset();
        setIsLogin(!isLogin);
    }
    
    const onSubmit: SubmitHandler<User> = useCallback(async (data) => {
        const resultAction = await dispatch(isLogin ? login(data) : createUser(data));
        const success = (isLogin ? login : createUser).fulfilled.match(resultAction);
        const prefix = isLogin ? 'LOGIN' : 'REGISTER';

        if (success)
            reset();
        else {
            const errorFields = resultAction.payload as any[];

            errorFields.forEach((error: any) => setError(error.field, {message: error.message}));
        }

        presentToast({
            color: success ? 'success' : 'danger',
            duration: 1000,
            message: t(`${prefix}.${prefix}_${(success ? 'SUCCESS' : 'FAILED')}`)}
        );
    }, [dispatch, t, isLogin, presentToast, reset, setError]);

    return (
        <>
            <SideMenu id="main" whenSplitPane={false}>
                <IonPage id="main">
                    <IonContent>
                        <div className="d-flex align-items-center justify-content-center h-100">
                            <IonRow className="w-100">
                                <IonCol size="12" sizeMd="8" sizeXl="4" offset="0" offsetMd="2" offsetXl="4">
                                    <IonCard className="p-4">
                                        {
                                            isLoading
                                                ? <IonProgressBar className="position-absolute top-0 start-0" type="indeterminate"></IonProgressBar>
                                                : ''
                                        }
                                        <IonCardHeader class="text-center">
                                            <IonCardTitle>
                                                <h1 className="mt-0 fs-1">{t(isLogin ? 'LOGIN.TITLE' : 'REGISTER.TITLE')}</h1>
                                            </IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <FormProvider {...form}>
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    { 
                                                        isLogin
                                                            ? LOGIN_FORM.map((field, index) => <CustomField {...field} key={index} />)
                                                            : ADD_EDIT_USER_FORM.map((field, index) => <CustomField {...field} key={index} />)
                                                    }
                                                    <IonButton className="mt-5" expand="block" type="submit">
                                                        {t(isLogin ? 'LOGIN.BUTTON_TEXT' : 'REGISTER.BUTTON_TEXT')}
                                                    </IonButton>
                                                    <div className="d-flex align-items-center justify-content-center mt-4">
                                                        <IonText>{t(isLogin ? 'LOGIN.HELPER_TEXT' : 'REGISTER.HELPER_TEXT')}</IonText>
                                                        <IonButton
                                                            fill="clear"
                                                            size="small"
                                                            color="dark"
                                                            className="fw-medium text-decoration-underline m-0"
                                                            onClick={() => handleToggleAuth()}>
                                                            {t(isLogin ? 'LOGIN.BUTTON_HELPER_TEXT' : 'REGISTER.BUTTON_HELPER_TEXT')}
                                                        </IonButton>
                                                    </div>
                                                </form>
                                            </FormProvider>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                        </div>
                        <IonFab slot="fixed" vertical="bottom" horizontal="start">
                            <IonMenuToggle>
                                <IonFabButton>
                                    <IonIcon icon={settingsOutline}></IonIcon>
                                </IonFabButton>
                            </IonMenuToggle>
                        </IonFab>
                    </IonContent>
                </IonPage>
            </SideMenu>
        </>
    );
};
