import { IonCol, IonRow } from "@ionic/react";
import { useCallback, useEffect } from "react";
import { isEqual } from 'lodash'
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { CustomFormModal, CustomField } from "../../../widgets/index";
import { Post } from "../models/index";
import { ADD_EDIT_POST_FORM } from "../consts/index";

type Props = {
    isOpen: boolean;
    post: Post;
    onDismiss: () => void;
    onSumbit: (data: Post) => void;
}

export const AddEditPost = ({isOpen, post, onDismiss, onSumbit}: Props) => {
    const form = useForm<Post>();

    const { 
        handleSubmit,
        reset,
    } = form;

    const handleDismiss = useCallback(() => {
        onDismiss();

        reset({});
    }, [reset, onDismiss]);

    const onHandleSubmit: SubmitHandler<Post> = useCallback((data) => {
        const hasSameFields = isEqual(post, data);

        if (!hasSameFields) {
            handleDismiss();
            onSumbit(data);
        }
    }, [post, handleDismiss, onSumbit]);

    useEffect(() => {
        reset(post ? {...post} : {});
    }, [post, reset])

    return (
        <CustomFormModal
            isOpen={isOpen}
            title={post ? 'POSTS.EDIT_POST_TITLE' : 'POSTS.ADD_POST_TITLE'}
            buttonText={post ? 'COMMON.LABELS.EDIT' : 'COMMON.LABELS.CONFIRM'}
            buttonType="submit"
            buttonForm="addEditForm"
            onDismiss={() => handleDismiss()}>
            <FormProvider {...form}>
                <form id="addEditForm" onSubmit={handleSubmit(onHandleSubmit)}>
                    <IonRow>
                        <IonCol size="12">
                            { ADD_EDIT_POST_FORM?.map((field, index) => <CustomField {...field} key={index} />) }
                        </IonCol>
                    </IonRow>
                </form>
            </FormProvider>
        </CustomFormModal>
    );
}