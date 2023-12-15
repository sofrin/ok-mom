import { api } from 'shared/api/baseApi';

import {
	LoginSchema,
	Parent,
	registerChildSchema,
	registerParentSchema,
} from 'shared/types';

import { UserResponse } from './types';
import { SESSION_TAG } from 'shared/api/tags';

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<UserResponse, LoginSchema>({
			query: (body) => ({
				url: '/auth',
				method: 'POST',
				body,
			}),
			invalidatesTags: [SESSION_TAG],
		}),
		parentRegister: builder.mutation<UserResponse, registerParentSchema>({
			query: (body) => ({
				url: '/register',
				method: 'POST',
				body,
			}),
			invalidatesTags: [SESSION_TAG],
		}),
		updateParentUser: builder.mutation<Parent, Partial<Parent>>({
			query: (body) => ({
				url: `/users/${body.id}`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: [SESSION_TAG],
		}),
		childRegister: builder.mutation<UserResponse, registerChildSchema>({
			query: (body) => ({
				url: 'register',
				method: 'POST',
				body,
			}),
			invalidatesTags: [SESSION_TAG],
		}),
	}),
});

export const { useLoginMutation, useParentRegisterMutation } = authApi;
