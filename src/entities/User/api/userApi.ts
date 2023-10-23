import { api } from 'shared/api/baseApi';
import { User } from '../model/types';

export const userApi = api.injectEndpoints({
	endpoints: (build) => ({
		me: build.query<User, void>({
			query: () => ({
				url: `/me`,
			}),
		}),
	}),
});

export const { useMeQuery } = userApi;
