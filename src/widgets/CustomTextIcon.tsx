import { IonIcon } from "@ionic/react";
import { memo, ReactNode } from "react";

type Props = {
    icon: string;
    iconColor?: string;
    iconSize?: 'small' | 'default' | 'large';
    inverted?: boolean;
    children?: ReactNode;
}

export const CustomTextIcon = memo(({icon, iconColor = 'dark', iconSize = 'default', inverted, children}: Props) => {
    const iconContent = <IonIcon 
        icon={icon}
        color={iconColor}
        size={iconSize}
        className={`${!inverted && 'me-2'} ${inverted && 'ms-2'}`}>
    </IonIcon>;

    return (
        <div className="d-flex align-items-center">
            {!inverted && iconContent}
            {children}
            {inverted && iconContent}
        </div>
    );
});