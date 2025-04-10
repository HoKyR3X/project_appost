import { IonCol, IonContent, IonFab, IonFabButton, IonIcon, IonPage, IonRow, IonSegment, IonSegmentButton, IonText } from "@ionic/react";
import { addOutline, alertCircleOutline, gridOutline, listOutline } from "ionicons/icons";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomAlert, CustomEmptyState, CustomSearchbar, CustomTextIcon } from "../../widgets/index";
import { PageHeader, SideMenu } from "../../components/index";
import { useRootDispatch, useRootSelector } from "../../store/hooks";
import { addPost, deletePost, editPost, getPosts } from "./store/posts";
import { Post, PostsReq, PostViews } from "./models/index";
import { DELETE_POST_ALERT_CONFIG, POST_VIEWS_OPTIONS } from "./consts/index";
import { PostItem, PostItemSkeleton, AddEditPost } from "./components/index";

export function Posts() {
    const dispatch = useRootDispatch();
    const { t } = useTranslation();

    const currentUser = useRootSelector(state => state.auth.currentUser);
    const posts = useRootSelector(state => state.post.data);
    const isLoading = useRootSelector(state => state.post.isLoading);
    const isSearching = useRootSelector(state => state.post.isSearching);

    const [payload, setPayload] = useState<PostsReq>({user_id: currentUser?.id});
    const [selectedView, setSelectedView] = useState<PostViews>(PostViews.GRID);
    const [formModal, setFormModal] = useState<any>({isOpen: false});
    const [deletePostId, setDeletePostId] = useState<number>(0);

    useEffect(() => {
        if (currentUser?.id)
            dispatch(getPosts(payload))
    }, [dispatch, currentUser?.id, payload]);

    const handleSubmitAddEditPost = useCallback((data: Post) => {
        if (data?.id)
            dispatch(editPost({postId: data?.id, data}));
        else
            dispatch(addPost({...data, user_id: currentUser?.id})) // Without BE session control this is dangerous 
    }, [dispatch, currentUser?.id]);

    const handleDismissDeleteAlert = useCallback((event: CustomEvent) => {
        const role = event.detail?.role || '';

        if (role === 'delete' && deletePostId)
            dispatch(deletePost(deletePostId))

        setDeletePostId(() => 0);
    }, [dispatch, deletePostId]);

    const isSearchingHelper = isSearching &&
        <div className="p-1">
            <CustomTextIcon
                icon={alertCircleOutline}
                iconColor="warning"
                iconSize="small">
                <IonText color="medium">
                    <small>{t('POSTS.SEARCHING_HELPER_TEXT')}</small>
                </IonText>
            </CustomTextIcon>
        </div>

    return (
        <>
            <SideMenu id="main">
                <IonPage id="main">
                    <PageHeader title="POSTS.PAGE_TITLE"></PageHeader>
                    <IonContent>
                        {
                            !isLoading
                                ? posts?.length
                                    ? <IonFab slot="fixed" vertical="bottom" horizontal="end">
                                        <IonFabButton onClick={() => setFormModal({isOpen: true})}>
                                            <IonIcon icon={addOutline}></IonIcon>
                                        </IonFabButton>
                                    </IonFab>
                                    : <CustomEmptyState 
                                        centered={true}
                                        header={t(isSearching ? 'POSTS.NO_POST' : 'POSTS.NEW_POST')}
                                        text={t(isSearching ? 'COMMON.LABELS.SEARCH_NO_RESULTS' : 'POSTS.CREATE_NEW_POST')}
                                        buttonColor={isSearching ? '' : 'primary'} 
                                        buttonIcon={addOutline}
                                        buttonText={isSearching ? '' : 'POSTS.NEW_POST'}
                                        onButtonClick={() => setFormModal({isOpen: true})}/>
                                : ''
                        }
                        <div className="px-3 mt-2">
                            <IonRow className="align-items-center">
                                <IonCol size="12" sizeLg="7">
                                    <CustomSearchbar
                                        searchPlaceholder="POSTS.SEARCH_PLACEHOLDER"
                                        onSearch={(query) => setPayload({...payload, title: query})}>
                                    </CustomSearchbar>
                                </IonCol>
                                <IonCol size="6" sizeMd="7" sizeLg="2" sizeXl="3" className="text-end">
                                    {!isLoading ? <div>{posts?.length} {t('POSTS.ITEM')}</div> : ''}
                                </IonCol>
                                <IonCol size="6" sizeMd="5" sizeLg="3" sizeXl="2">
                                    <IonSegment
                                        value={selectedView}
                                        disabled={!posts?.length || isLoading}
                                        onIonChange={(event) => setSelectedView(event.detail?.value as PostViews || PostViews.GRID)}>
                                        <IonSegmentButton value={PostViews.GRID}>
                                            <IonIcon icon={gridOutline}></IonIcon>
                                        </IonSegmentButton>
                                        <IonSegmentButton value={PostViews.LIST}>
                                            <IonIcon icon={listOutline}></IonIcon>
                                        </IonSegmentButton>
                                    </IonSegment>
                                </IonCol>
                            </IonRow>
                            {isSearchingHelper}
                        </div>
                        <div className={POST_VIEWS_OPTIONS[selectedView].containerClass}>
                            <IonRow> {
                                posts?.map((post: Post, index) => 
                                    <IonCol 
                                        size="12"
                                        sizeLg={POST_VIEWS_OPTIONS[selectedView].sizeLg}
                                        sizeXl={POST_VIEWS_OPTIONS[selectedView].sizeXl}
                                        className={POST_VIEWS_OPTIONS[selectedView].class} 
                                        key={index}>
                                        { isLoading 
                                            ? <PostItemSkeleton view={selectedView}></PostItemSkeleton>
                                            : <PostItem 
                                                post={post}
                                                view={selectedView}
                                                onEditPost={() => setFormModal({post, isOpen: true})}
                                                onDeletePost={(postId) => setDeletePostId(postId)}>
                                            </PostItem>
                                        }
                                    </IonCol>
                                )
                            }
                            </IonRow>
                        </div>
                        <AddEditPost 
                            {...formModal}
                            onDismiss={() => setFormModal({isOpen: false})}
                            onSumbit={(data) => handleSubmitAddEditPost(data)}
                        ></AddEditPost>
                        <CustomAlert
                            isOpen={!!deletePostId}
                            options={DELETE_POST_ALERT_CONFIG}
                            onDismiss={(event) => handleDismissDeleteAlert(event)}>
                        </CustomAlert>
                    </IonContent>
                </IonPage>
            </SideMenu>
        </>
    );
};
