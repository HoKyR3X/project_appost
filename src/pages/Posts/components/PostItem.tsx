import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonRow } from "@ionic/react";
import { memo, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { CustomButtonActions } from "../../../widgets/index";
import { Post, PostViews } from "../models/index";
import { POST_ACTIONS_BUTTON } from "../consts/index";

type Props = {
    post: Post;
    view?: string;
    onEditPost: (id: number) => void
    onDeletePost: (id: number) => void
}

const RenderView = ({post, view, onEditPost, onDeletePost}: Props) => {
    const slider = useRef<HTMLIonItemSlidingElement>(null);
    const { t } = useTranslation();
    
    const handleActions = useCallback((role: string) => {
        slider.current?.close();

        switch(role) {
            case 'edit': {
                onEditPost(post.id);
            }
            break;
            case 'delete': {
                onDeletePost(post.id);
            }
        }
    }, [post.id, onEditPost, onDeletePost]);

    const handleSwipeItem = useCallback(() => {
        const action = POST_ACTIONS_BUTTON.find(action => !!action.expandable);

        if (action)
            handleActions(action.role);
    }, [handleActions]);

    switch(view) {
        case PostViews.GRID: {
            return (
                <IonCard className="m-0 h-100 item-card" button={true} onClick={() => handleActions('edit')}>
                    <IonCardHeader>
                        <IonCardTitle className="text-truncate">{post.title}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <div>{post.body}</div>
                    </IonCardContent>
                    <CustomButtonActions
                        actions={POST_ACTIONS_BUTTON} 
                        onSelectAction={(role) => handleActions(role)}>
                    </CustomButtonActions>
                </IonCard>
            );
        }
        case PostViews.LIST: {
            return (
                <IonItemSliding ref={slider}>
                    <IonItem 
                        className="with-inner-padding"
                        lines="full"
                        button={true}
                        detail={true}
                        onClick={() => slider.current?.open('end')}>
                        <IonRow className="w-100 py-2">
                            <IonCol size="12" className="ps-0">
                                <div>
                                    <h2 className="m-0">{post.title}</h2>
                                    <div className="mt-2">{post.body}</div>
                                </div>
                            </IonCol>
                        </IonRow>
                    </IonItem>

                    <IonItemOptions onIonSwipe={() => handleSwipeItem()}>
                        {
                            POST_ACTIONS_BUTTON.map((action, index) => 
                                <IonItemOption 
                                    color={action.color}
                                    expandable={!!action.expandable}
                                    key={index}
                                    onClick={() => handleActions(action.role)}>
                                    {t(action.text)}
                                    <IonIcon icon={action.icon} className="fs-4"></IonIcon>
                                </IonItemOption>
                            )
                        }
                    </IonItemOptions>
                </IonItemSliding>
            );
        }
    }
}

export const PostItem = memo((props: Props) => {
    return (
        RenderView(props)
    );
});