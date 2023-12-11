import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'shared/redux/store';
import { LoginSchema, registerSchema } from 'shared/types';
import { authApi } from '../api/authApi';
import { User } from 'entities/User/model/types';
import { isFetchBaseQueryError } from 'shared/api/isFetchBaseQueryError';

type AuthState = {
	user: User | null;
	token: string | null;
};

export const loginThunk = createAsyncThunk<
	void,
	LoginSchema,
	{ state: RootState }
>('auth/login', async (body: LoginSchema, { dispatch }) => {
	try {
		await dispatch(authApi.endpoints.login.initiate(body)).unwrap();
	} catch (error) {
		if (isFetchBaseQueryError(error)) {
			if (typeof error.data === 'string') {
				throw new Error(error.data);
			}
		}
		throw new Error('Unknown error');
	}
});
export const registerThunk = createAsyncThunk<
	void,
	registerSchema,
	{ state: RootState }
>('auth/register', async (body: registerSchema, { dispatch }) => {
	try {
		await dispatch(authApi.endpoints.register.initiate(body)).unwrap();
	} catch (error) {
		if (isFetchBaseQueryError(error)) {
			if (typeof error.data === 'string') {
				throw new Error(error.data);
			}
		}
		throw new Error('Unknown error');
	}
});

const authSlice = createSlice({
	name: 'auth',
	initialState: { user: null, token: null } as AuthState,
	reducers: {
		setCredentials: (
			state,
			{
				payload: { user, token },
			}: PayloadAction<{ user: User; token: string }>,
		) => {
			state.user = user;
			state.token = token;
		},
		setToken: (state, { payload }: PayloadAction<string>) => {
			state.token = payload;
		},
		logOut: (state) => {
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state: AuthState, { payload }) => {
				state.user = payload.data;
				state.token = payload.token;
			},
		);
		builder.addMatcher(
			authApi.endpoints.register.matchFulfilled,
			(state: AuthState, { payload }) => {
				state.user = payload.data;
				state.token = payload.token;
			},
		);
	},
});

export const authReducer = authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const { logOut, setCredentials, setToken } = authSlice.actions;
