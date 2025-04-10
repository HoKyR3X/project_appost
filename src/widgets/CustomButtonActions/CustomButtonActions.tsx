import { IonButton, IonIcon, IonItem, IonLabel, IonList, IonPopover } from "@ionic/react";
import { ellipsisHorizontal } from "ionicons/icons";
import { memo, MouseEvent, useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Action } from "../../models/index";

import './CustomButtonActions.css';

type Props = {
    actions: Action[];
    onSelectAction: (role: string) => void
}

export const CustomButtonActions = memo(({actions, onSelectAction}: Props) => {
    const popover = useRef<HTMLIonPopoverElement>(null);
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);

    const handleClickButtonOpenActions = useCallback((event: MouseEvent<HTMLIonButtonElement>) => {
        setIsOpen(!isOpen);

        if (popover?.current)
            popover.current.event = event;

        event.preventDefault();
        event.stopPropagation();
    }, [isOpen]);

    const handleClickAction = useCallback((event: MouseEvent<HTMLIonItemElement>, action: Action) => {
        popover.current?.dismiss();

        onSelectAction(action.role);

        event.preventDefault();
        event.stopPropagation();
    }, [onSelectAction]);

    return(
        <>
            <IonButton
                className="position-absolute actions-button m-0"
                fill="clear"
                size="small"
                color="medium"
                onClick={(event) => handleClickButtonOpenActions(event)}>
                <IonIcon icon={ellipsisHorizontal} color="medium"></IonIcon>
            </IonButton>
            <IonPopover mode="md" ref={popover} isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
                <IonList lines="none" className="p-0">
                    {
                        actions.map((action, index) => 
                            <IonItem
                                className="with-inner-padding"
                                button={true}
                                color={action.color}
                                key={index}
                                onClick={(event) => handleClickAction(event, action)}>
                                <IonLabel>{t(action.text)}</IonLabel>
                                <IonIcon icon={action.icon}></IonIcon>
                            </IonItem>
                        )
                    }
                </IonList>
            </IonPopover>
        </>
    );
});