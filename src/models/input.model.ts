import { FieldConfig } from "./index";

export class InputConfig extends FieldConfig {
    field: string = 'input';
    type?: TextFieldTypes = 'text';
    showTogglePassword?: boolean = false;
}

export type TextFieldTypes = "date" 
    | "datetime-local" 
    | "email" 
    | "month" 
    | "number" 
    | "password" 
    | "search" 
    | "tel" 
    | "text" 
    | "time" 
    | "url" 
    | "week";