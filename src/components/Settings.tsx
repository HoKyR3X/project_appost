import { IonIcon, IonItem, IonList, IonRadio, IonRadioGroup, IonToggle, RadioGroupCustomEvent } from "@ionic/react";
import { moonOutline, settingsOutline } from "ionicons/icons";
import { useCallback, useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { AVAILABLE_LANGUAGES } from "../consts/index";
import { getItemFromSession, setItemInSession } from "../functions/index";
import { CustomTextIcon } from "../widgets/index";

export const Settings = () => {
    const setDocumentTheme = (toggle: boolean) => {
        document.documentElement.classList.toggle('ion-palette-dark', toggle);
    };

    const darkMode = getItemFromSession('darkMode');
    setDocumentTheme(darkMode);

    const { t } = useTranslation();
    
    const [language, setLanguage] = useState(i18next.language);
    const [paletteToggle, setPaletteToggle] = useState(darkMode);

    const toggleChange = useCallback(() => {
        setPaletteToggle(!paletteToggle);
        setDocumentTheme(!paletteToggle);
        setItemInSession('darkMode', !paletteToggle);
    }, [paletteToggle]);

    const handleLanguageChange = useCallback((event: RadioGroupCustomEvent) => {
        const selectedLanguage = event.detail.value;

        setLanguage(selectedLanguage);
        i18next.changeLanguage(selectedLanguage);
    }, []);

    return (
        <>
            <div className="custom-border-bottom ps-3">
                <CustomTextIcon
                    icon={settingsOutline}
                    iconColor="dark"
                    iconSize="large">
                    <h2 className="w-100 m-0 py-3 ps-2">{t('COMMON.LABELS.SETTINGS')}</h2>
                </CustomTextIcon>
            </div>

            <h4 className="ps-3">{t('COMMON.LABELS.LANGUAGE')}</h4>
            <IonList lines="none" className="ion-bg-transparent custom-border-bottom">
                <IonRadioGroup value={language} onIonChange={(event) => handleLanguageChange(event)}>
                    {
                        AVAILABLE_LANGUAGES?.map((language, index) => 
                            <IonItem className="ion-bg-transparent with-inner-padding" key={index}>
                                <img slot="start" width={30} alt="Image flag" src={language.flagImg}></img>
                                <IonRadio value={language.code}>{t(language.label)}</IonRadio>
                            </IonItem>
                        )
                    }
                </IonRadioGroup>
            </IonList>

            <h4 className="ps-3">{t('COMMON.LABELS.THEME')}</h4>
            <IonList lines="none" className="ion-bg-transparent">
                <IonItem className="ion-bg-transparent with-inner-padding">
                    <IonIcon slot="start" icon={moonOutline}></IonIcon>
                    <IonToggle 
                        enableOnOffLabels={true} 
                        checked={paletteToggle}
                        onIonChange={() => toggleChange()}>
                        {t('COMMON.LABELS.DARK_THEME')}
                    </IonToggle>
                </IonItem>
            </IonList>
        </>
    );
}