import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit'
import { EditPostReq, Post, PostsReq } from '../models/index';
import { baseClient } from '../../../server/base-client';

interface PostState {
    data: Post[];
    isLoading: boolean;
    isSearching: boolean;
}

const resourcePath = 'posts';
const { getAllResource, addResource, editResource, deleteResource } = baseClient<Post>({resourcePath});

const initialState: PostState = {
    data: new Array(12).fill(2),
    isLoading: false,
    isSearching: false
}

const postsPendingReducer = (state: PostState) => {state.isLoading = true};
const postsFulfilledReducer = (state: PostState) => {state.isLoading = false};
const postsRejectedReducer = (state: PostState) => {
    state.isLoading = false;
    state.isSearching = false;
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
        .addCase(getPosts.pending, (state) => { // Custom pending reducer for show skeletons
            state.data = new Array(12).fill(2);
            state.isSearching = false;
        })
        .addCase(getPosts.fulfilled, (state, action: PayloadAction<{posts: Post[], isSearching: boolean}>) => {
            state.data = action.payload.posts;
            state.isSearching = action.payload.isSearching;
        })
        .addCase(editPost.fulfilled, (state, action: PayloadAction<Post>) => {
            state.data = [...state.data].map(post => post.id === action.payload.id ? action.payload : post);
        })
        .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
            state.data = [action.payload, ...state.data];
        })
        .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
            state.data = [...state.data].filter(post => post.id !== action.payload)
        })
        .addMatcher(
            isPending(getPosts, editPost, addPost, deletePost),
            postsPendingReducer
        )
        .addMatcher(
            isFulfilled(getPosts, editPost, addPost, deletePost),
            postsFulfilledReducer
        )
        .addMatcher(
            isRejected(getPosts, editPost, addPost, deletePost),
            postsRejectedReducer
        )
  }
});

export const getPosts = createAsyncThunk(
    "post/getAll",
    async (data: PostsReq, { rejectWithValue }) => 
    getAllResource(data)
        .then(res => ({
            posts: res.data,
            isSearching: !!data.title /* !!data.title || !!data.body */ // Only title because GO REST maybe don't manage queryParams in OR but in AND for filter results
        }))
        .catch((err) => rejectWithValue(err))
);

export const addPost = createAsyncThunk(
    "post/add",
    async (data: PostsReq, { rejectWithValue }) => 
    addResource(data)
        .then(res => res.data)
        .catch((err) => rejectWithValue(err))
);

export const editPost = createAsyncThunk(
    "post/edit",
    async ({postId, data}: EditPostReq, { rejectWithValue }) => 
    editResource(postId, data)
        .then(res => res.data)
        .catch((err) => rejectWithValue(err))
);

export const deletePost = createAsyncThunk(
    "post/delete",
    async (postId: number, { rejectWithValue }) => 
    deleteResource(postId)
        .then(() => postId)
        .catch((err) => rejectWithValue(err))
);

export default postSlice.reducer;