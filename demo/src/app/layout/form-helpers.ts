export enum InputType {
    'number',
    'text',
    'checkbox',
    'radio',
    'group',
}

export interface RadioOption {
    value?: string;
    label: string;
}

export type RadioOptions = Record<string, RadioOption[]>;
