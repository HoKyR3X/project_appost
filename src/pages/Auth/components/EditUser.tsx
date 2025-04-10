import { IonCol, IonRow, useIonToast } from "@ionic/react";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { isEqual } from "lodash";
import { CustomFormModal, CustomField, CustomAvatar } from "../../../widgets/index";
import { User } from "../models/index";
import { ADD_EDIT_USER_FORM, EDIT_USER_FAILED_TOAST, EDIT_USER_SUCCESS_TOAST } from "../consts/index";
import { useRootDispatch } from "../../../store/hooks";
import { editUser } from "../store/auth";
import { trashOutline } from "ionicons/icons";

type Props = {
    isOpen: boolean;
    user: User;
    onDismiss: () => void;
    onDelete: () => void;
}

export const EditUser = ({isOpen, user, onDismiss, onDelete}: Props) => {
    const dispatch = useRootDispatch();
    const form = useForm<User>();

    const { handleSubmit, reset, setError} = form;
    const { t } = useTranslation();
    const [presentToast] = useIonToast();

    const handleDismiss = useCallback(() => {
        onDismiss();
        reset();
    }, [onDismiss, reset]);

    const handleSubmitEditUser: SubmitHandler<User> = useCallback(async (data: User) => {
        const hasSameFields = isEqual(user, data);

        if (data?.id && !hasSameFields) {
            const resultAction = await dispatch(editUser({userId: data?.id, data}));
            const success = editUser.fulfilled.match(resultAction);
            const feedbackToast = success ? EDIT_USER_SUCCESS_TOAST : EDIT_USER_FAILED_TOAST;

            if (success)
                handleDismiss();
            else {
                const errorFields = resultAction.payload as any[];

                errorFields.forEach((error: any) => setError(error.field, {message: error.message}));
            }

            presentToast({
                ...feedbackToast, 
                message: t(feedbackToast.message as string)
            });
        }
    }, [dispatch, t, user, handleDismiss, presentToast, setError]);

    useEffect(() => {
        reset(user ? {...user} : {});
    }, [user, reset])

    return (
        <CustomFormModal
            isOpen={isOpen}
            title={'USERS.EDIT_USER_PROFILE'}
            buttonText="COMMON.LABELS.EDIT"
            buttonType="submit"
            buttonForm="editUserForm"
            onDismiss={() => handleDismiss()}>
            <IonRow>
                <IonCol size="12" class="d-flex justify-content-center mb-3">
                    <CustomAvatar 
                        size="xl"
                        floatIcon={trashOutline}
                        floatIconSize="large"
                        floatIconColor="danger"
                        onClickFloatIcon={() => onDelete()}>
                    </CustomAvatar>
                </IonCol>
            </IonRow>
            <FormProvider {...form}>
                <form id="editUserForm" onSubmit={handleSubmit(handleSubmitEditUser)}>
                    <IonRow>
                        <IonCol size="12">
                            { ADD_EDIT_USER_FORM?.map((field, index) => <CustomField {...field} key={index} />) }
                        </IonCol>
                    </IonRow>
                </form>
            </FormProvider>
        </CustomFormModal>
    );
}