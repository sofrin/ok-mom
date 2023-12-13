import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { taskReducer } from 'entities/CardTask/model/taskSlice';
import { giftReducer } from 'entities/Gifts/model/giftsSlice';
import { suggestionsReducer } from 'entities/Suggestions/model/suggestionSlice';
import { authReducer } from 'features/authentication/model/authSlice';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from 'shared/api/baseApi';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: [api.reducerPath],
};

const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	auth: authReducer,
	task: taskReducer,
	gift: giftReducer,
	suggestions: suggestionsReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
