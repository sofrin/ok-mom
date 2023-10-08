import { configureStore } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';
import { api } from 'shared/api/auth';
import auth from './authSlice';
const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		auth,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
