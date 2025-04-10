import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';
import { EditUserReq, User } from '../models/index';
import { getItemFromSession, removeItemFromSession, setItemInSession } from '../../../functions/index';
import { baseClient } from '../../../server/index';

interface AuthState {
    currentUser: User | null;
    isLoading: boolean;
}

const currentUser = getItemFromSession('user');
const resourcePath = 'users';
const { getAllResource, addResource, editResource, deleteResource } = baseClient<User>({resourcePath});

const initialState: AuthState = {
    currentUser,
    isLoading: false,
}

const getUserParams = (params: Omit<User, 'id'>) => 
    ({...params, status: 'active'}); 

const findCorrectUser = (users: User[], {email, name}: Omit<User, 'id'>) => 
    users.find(user => 
        user?.email?.toLowerCase() === email?.toLowerCase() &&
        user?.name?.toLowerCase() === name?.toLowerCase()
    );

const authPendingReducer = (state: AuthState) => {state.isLoading = true};
const authRejectedReducer = (state: AuthState) => {state.isLoading = false};
const authSetUserFulfilledReducer = (state: AuthState, { payload }: PayloadAction<User>) => {
    state.isLoading = false;
    state.currentUser = payload;

    setItemInSession('user', payload);
}
const authRemoveUserFulfilledReducer = (state: AuthState) => {
    state.isLoading = false;
    state.currentUser = null;

    removeItemFromSession('user');
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
        .addMatcher(
            isPending(login, logout, createUser, editUser, deleteUser),
            authPendingReducer
        )
        .addMatcher(
            isFulfilled(login, createUser, editUser),
            authSetUserFulfilledReducer
        )
        .addMatcher(
            isFulfilled(logout, deleteUser),
            authRemoveUserFulfilledReducer
        )
        .addMatcher(
            isRejected(login, logout, createUser, editUser, deleteUser),
            authRejectedReducer
        )
    }
});

export const login = createAsyncThunk(
    "auth/login",
    async (data: Omit<User, 'id'>, { rejectWithValue }) => 
    getAllResource(getUserParams(data))
        .then(res => {
            const user = res?.data?.length && findCorrectUser(res.data, data);
            
            return user || rejectWithValue([]);
        })
        .catch((err) => rejectWithValue(err))
);

export const logout = createAsyncThunk(
    "auth/logout",
    async () => await new Promise((resolve) => resolve(true)).then(() => true)
);

export const createUser = createAsyncThunk(
    "auth/createUser",
    async (data: Omit<User, 'id'>, { rejectWithValue }) => 
    addResource(getUserParams(data))
        .then(res => res.data)
        .catch((err) => rejectWithValue(err))
    );

export const editUser = createAsyncThunk(
    "auth/editUser",
    async ({userId, data}: EditUserReq, { rejectWithValue }) => 
    editResource(userId, getUserParams(data))
        .then(res => res.data)
        .catch((err) => rejectWithValue(err))
);

export const deleteUser = createAsyncThunk(
    "auth/deleteUser",
    async (userId: number, { rejectWithValue }) => 
    deleteResource(userId)
        .then(res => res.data)
        .catch((err) => rejectWithValue(err))
);

export default authSlice.reducer;