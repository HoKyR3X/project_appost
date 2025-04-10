export interface PostsReq {
    user_id?: number | string;
    title?: string;
    body?: string;
}

export interface EditPostReq {
    postId: number;
    data: Omit<PostsReq, 'user_id'>;
}