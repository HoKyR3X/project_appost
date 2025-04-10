export interface Action {
    text: string;
    icon: string;
    color: string;
    role: string;
    expandable?: boolean;
}

export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';