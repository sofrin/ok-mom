import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './baseQueryWithReauth';
import { SESSION_TAG, TASK_TAG } from './tags';

export const api = createApi({
	tagTypes: [SESSION_TAG, TASK_TAG],
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
});
