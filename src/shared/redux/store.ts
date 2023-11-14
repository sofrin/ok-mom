import { configureStore } from '@reduxjs/toolkit';
import { taskReducer } from 'entities/CardTask/model/taskSlice';
import { giftReducer } from 'entities/Gifts/model/GiftsSlice';

import { authReducer } from 'features/authentication/model/authSlice';

import { api } from 'shared/api/baseApi';

const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		auth: authReducer,
		task: taskReducer,
		gift: giftReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
