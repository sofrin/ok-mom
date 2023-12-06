import { api } from 'shared/api/baseApi';

import { LoginSchema, registerSchema } from 'shared/types';

import { UserResponse } from './types';
import { SESSION_TAG } from 'shared/api/tags';

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<UserResponse, LoginSchema>({
			query: (body) => ({
				url: 'login',
				method: 'POST',
				body,
			}),
			invalidatesTags: [SESSION_TAG],
		}),
		register: builder.mutation<UserResponse, registerSchema>({
			query: (body) => ({
				url: 'register',
				method: 'POST',
				body,
			}),
			invalidatesTags: [SESSION_TAG],
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
