import { configureStore } from "@reduxjs/toolkit";
import post from '../pages/Posts/store/posts';
import auth from '../pages/Auth/store/auth';

export const store = configureStore({
    reducer: { auth, post }
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch; 