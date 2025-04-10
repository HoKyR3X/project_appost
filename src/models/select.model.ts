import { FieldConfig } from "./index";

export class SelectConfig extends FieldConfig {
    field: string = 'select';
    options: SelectOption[] = [];
}

export class SelectOption {
    value: string = '';
    label: string = '';
}