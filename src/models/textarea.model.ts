import { FieldConfig } from './index';

export class TextareaConfig extends FieldConfig {
    field: string = 'textarea';
    autoGrow?: boolean = false;
    rows?: number = 5;
    maxLength?: number;
}