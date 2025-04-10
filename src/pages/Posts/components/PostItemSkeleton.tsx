import { IonCard, IonCardContent, IonCol, IonItem, IonRow, IonSkeletonText } from "@ionic/react";
import { memo } from "react";
import { PostViews } from "../models/index";

type Props = {
    view?: string;
}

const RenderView = ({view}: Props) => {
    switch(view) {
        case PostViews.GRID: {
            return (
                <IonCard className="m-0 h-100 skeleton-card">
                    <IonCardContent>
                        <IonRow>
                            <IonCol size="3">
                                <IonSkeletonText animated={true}></IonSkeletonText>
                            </IonCol>
                            <IonCol size="3" offset="6">
                                <IonSkeletonText animated={true}></IonSkeletonText>
                            </IonCol>
                        </IonRow>
                        <IonRow className="align-items-center">
                            <IonCol size="8">
                                <IonSkeletonText animated={true}></IonSkeletonText>
                            </IonCol>
                            <IonCol size="5">
                                <IonSkeletonText animated={true}></IonSkeletonText>
                            </IonCol>
                            <IonCol size="6">
                                <IonSkeletonText animated={true}></IonSkeletonText>
                            </IonCol>
                        </IonRow>
                    </IonCardContent>
                </IonCard>
            );
        }
        case PostViews.LIST: {
            return (
                <IonItem>
                    <IonRow className="w-100 p-3">
                        <IonCol size="8">
                            <IonSkeletonText animated={true}></IonSkeletonText>
                        </IonCol>
                        <IonCol size="1" offset="3">
                            <IonSkeletonText animated={true}></IonSkeletonText>
                        </IonCol>
                        <IonCol size="6">
                            <IonSkeletonText animated={true}></IonSkeletonText>
                        </IonCol>
                        <IonCol size="2" offset="4">
                            <IonSkeletonText animated={true}></IonSkeletonText>
                        </IonCol>
                    </IonRow>
                </IonItem>
            );
        }
    }
}

export const PostItemSkeleton = memo((props: Props) => {
    return (
        RenderView(props)
    );
});