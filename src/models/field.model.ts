import { InputConfig, SelectConfig } from "./index";

export class FieldConfig {
    name: string = '';
    label: string = '';
    placeholder?: string = '';
    labelPlacement?: LabelPlacementsTypes = 'floating';
    fill?: FillsTypes = 'outline';
    value?: string = '';
    class?: string = '';
    validation?: InputValidators = {};
    iconStart?: InputIcon = undefined;
}

export interface InputValidators {
    [key: string]: {
        value: boolean | string | RegExp;
        message: string;
    }
}

export class InputIcon {
    icon: string = '';
    color: string = 'dark';
    class: string = 'fs-5';
}

export type LabelPlacementsTypes = "fixed" 
    | "floating" 
    | "start" 
    | "end" 
    | "stacked";

export type FillsTypes = "outline" | "solid";

export type FormConfig = InputConfig | SelectConfig;