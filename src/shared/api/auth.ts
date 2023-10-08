import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'shared/redux/store';
import { LoginSchema, registerSchema } from 'shared/types';


export interface UserResponse {
	user: User;
	token: string;
}

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: '/',
		prepareHeaders: (headers, { getState }) => {
			// By default, if we have a token in the store, let's use that for authenticated requests
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set('authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		login: builder.mutation<UserResponse, LoginSchema>({
			query: (credentials) => ({
				url: 'login',
				method: 'POST',
				body: credentials,
			}),
		}),
		register: builder.mutation<UserResponse, registerSchema>({
			query: (formData) => ({
				url: 'register',
				method: 'POST',
				body: formData,
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = api;
