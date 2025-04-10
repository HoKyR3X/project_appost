import { IonAvatar, IonIcon } from "@ionic/react";
import { memo } from "react";
import { Sizes } from "../models/index";
import { AVATAR_PLACEHOLDER_IMG } from "../consts/index";

type Props = {
    avatarImg?: string;
    size?: Sizes;
    floatIcon?: string;
    floatIconSize?: 'small' | 'default' | 'large';
    floatIconColor?: string;
    onClickFloatIcon?: () => void;
}

export const CustomAvatar = memo(({avatarImg, size, floatIcon, floatIconSize = 'default', floatIconColor = 'dark', onClickFloatIcon}: Props) => {
    const floatIconContent = floatIcon && 
        <div 
            className={`float-icon d-flex align-items-center justify-content-center ion-bg-${floatIconColor} ion-contrast-${floatIconColor}`}
            onClick={() => onClickFloatIcon!()}>
            <IonIcon icon={floatIcon} size={floatIconSize}></IonIcon>
        </div>
    
    return (
        <IonAvatar className={`${floatIcon && 'float-icon-avatar position-relative'} ${size && 'ion-avatar-' + size}`}>
            {floatIconContent}
            <img alt="Silhouette of a person's head" src={avatarImg || AVATAR_PLACEHOLDER_IMG}/>
        </IonAvatar>
    );
});