import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'shared/redux/store';
import {
	LoginSchema,
	Parent,
	registerChildSchema,
	registerParentSchema,
} from 'shared/types';
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
export const updateParentUserThunk = createAsyncThunk<
	Parent,
	Partial<Parent>,
	{ state: RootState }
>(
	'auth/updateParentUser',
	async (body: Partial<Parent>, { dispatch }): Promise<Parent> => {
		try {
			const res = await dispatch(
				authApi.endpoints.updateParentUser.initiate(body),
			).unwrap();
			return res;
		} catch (error) {
			if (isFetchBaseQueryError(error)) {
				if (typeof error.data === 'string') {
					throw new Error(error.data);
				}
			}
			throw new Error('Unknown error');
		}
	},
);
export const parentRegisterThunk = createAsyncThunk<
	void,
	registerParentSchema,
	{ state: RootState }
>('auth/parentRegister', async (body: registerParentSchema, { dispatch }) => {
	try {
		await dispatch(authApi.endpoints.parentRegister.initiate(body)).unwrap();
	} catch (error) {
		if (isFetchBaseQueryError(error)) {
			if (typeof error.data === 'string') {
				throw new Error(error.data);
			}
		}
		throw new Error('Unknown error');
	}
});
export const childRegisterThunk = createAsyncThunk<
	void,
	registerChildSchema,
	{ state: RootState }
>('auth/childRegister', async (body: registerChildSchema, { dispatch }) => {
	try {
		await dispatch(authApi.endpoints.childRegister.initiate(body)).unwrap();
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
			}: PayloadAction<{ user: User; token?: string }>,
		) => {
			state.user = user;
			if (token) {
				state.token = token;
			}
		},
		setToken: (state, { payload }: PayloadAction<string>) => {
			state.token = payload;
		},
		logOut: (state) => {
			state.user = null;
			state.token = null;
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
			authApi.endpoints.parentRegister.matchFulfilled,
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
