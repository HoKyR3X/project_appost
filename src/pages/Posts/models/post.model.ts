export interface Post {
    id: number;
    user_id: number;
    title: string;
    body: string;
}

export enum PostViews {
    GRID = 'grid',
    LIST = 'list'
}