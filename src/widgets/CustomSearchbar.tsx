import { IonSearchbar } from "@ionic/react";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    searchPlaceholder: string;
    minLength?: number;
    onSearch: (query: string) => void;
}

export const CustomSearchbar = memo(({searchPlaceholder, minLength = 3, onSearch}: Props) => {
    const { t } = useTranslation();
    
    const handleInput = useCallback((event: Event) => {
        const target = event.target as HTMLIonSearchbarElement;
        const query = target ? target.value!.toLowerCase() : '';
    
        if (!query || query?.length >= minLength)
            onSearch(query);
    }, [minLength, onSearch]);

    return (
        <IonSearchbar
            placeholder={t(searchPlaceholder, {characters: minLength})} 
            debounce={500} 
            className="p-0"
            minlength={minLength}
            onIonInput={(event) => handleInput(event)}>
        </IonSearchbar>
    );
});