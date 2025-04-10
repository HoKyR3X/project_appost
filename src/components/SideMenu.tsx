import { IonContent, IonMenu, IonSplitPane } from "@ionic/react";
import { memo, ReactNode } from "react";
import { useRootSelector } from "../store/hooks";
import { UserHeader, Settings } from "./index";

type Props = { 
    id: string;
    whenSplitPane?: string | boolean;
    children?: ReactNode;
};

export const SideMenu = memo(({id, whenSplitPane = 'md', children}: Props) => {
    const currentUser = useRootSelector(state => state.auth.currentUser);

    return (
        <IonSplitPane when={whenSplitPane} contentId={id}>
            <IonMenu contentId={id}>
                {currentUser && <UserHeader></UserHeader>}

                <IonContent>
                    <Settings></Settings>
                </IonContent>
            </IonMenu>

            {children}
        </IonSplitPane>
    );
});