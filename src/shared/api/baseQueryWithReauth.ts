import {
	BaseQueryApi,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { baseQuery } from './baseQuery';
import { logOut, setToken } from 'features/authentication/model/authSlice';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export async function baseQueryWithReauth(
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: NonNullable<unknown>,
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
	let result = await baseQuery(args, api, extraOptions);
	if (result.error && result.error.status === 401) {
		// try to get a new token
		const refreshResult = await baseQuery('/refreshToken', api, extraOptions);
		if (typeof refreshResult.data === 'string') {
			// store the new token
			api.dispatch(setToken(refreshResult.data));
			//                                    ^?
			// retry the initial query
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(logOut());
		}
	}
	return result;
}
