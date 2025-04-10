import { FormConfig, InputConfig, SelectConfig, TextareaConfig } from "../models/index.ts";
import { CustomInput, CustomSelect, CustomTextarea } from "./index";

export function CustomField(config: FormConfig) {
    const renderField = (config: FormConfig) => {
        switch(config.field) {
            case 'input': {
                return <CustomInput {...config as InputConfig} />
            }
            case 'select': {
                return <CustomSelect {...config as SelectConfig} />
            }
            case 'textarea': {
                return <CustomTextarea {...config as TextareaConfig} />
            }
        }
    }

    return (
        renderField(config)
    );
};