import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { tasksApi } from '../api/tasksApi';
import { RootState } from 'shared/redux/store';
import { isFetchBaseQueryError } from 'shared/api/isFetchBaseQueryError';
import { taskSchema } from 'shared/types';

export const getTasksThunk = createAsyncThunk<void, void, { state: RootState }>(
	'task/getTasks',
	async (_, { dispatch }) => {
		try {
			await dispatch(tasksApi.endpoints.getTasks.initiate()).unwrap();
		} catch (error) {
			if (isFetchBaseQueryError(error)) {
				if (typeof error.data === 'string') {
					throw new Error(error.data);
				}
			}
		}
		throw new Error('Unknown error');
	},
);
export const createTaskThunk = createAsyncThunk<
	void,
	taskSchema,
	{ state: RootState }
>('task/createTask', async (body: taskSchema, { dispatch }) => {
	try {
		await dispatch(tasksApi.endpoints.createTask.initiate(body)).unwrap();
	} catch (error) {
		if (isFetchBaseQueryError(error)) {
			if (typeof error.data === 'string') {
				throw new Error(error.data);
			}
		}
	}
	throw new Error('Unknown error');
});
export const updateTaskThunk = createAsyncThunk<
	void,
	taskSchema,
	{ state: RootState }
>('task/updateTask', async (body: taskSchema, { dispatch }) => {
	try {
		await dispatch(tasksApi.endpoints.updateTask.initiate(body)).unwrap();
	} catch (error) {
		if (isFetchBaseQueryError(error)) {
			if (typeof error.data === 'string') {
				throw new Error(error.data);
			}
		}
	}
	throw new Error('Unknown error');
});
export const deleteTaskThunk = createAsyncThunk<
	void,
	string,
	{ state: RootState }
>('task/deleteTask', async (id: string, { dispatch }) => {
	try {
		await dispatch(tasksApi.endpoints.deleteTask.initiate(id)).unwrap();
	} catch (error) {
		if (isFetchBaseQueryError(error)) {
			if (typeof error.data === 'string') {
				throw new Error(error.data);
			}
		}
	}
	throw new Error('Unknown error');
});
type TaskSliceState = taskSchema[];
const initialState: TaskSliceState = [];
const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			tasksApi.endpoints.getTasks.matchFulfilled,
			(state, { payload }) => {
				state = payload;
			},
		);
	},
});

export const taskReducer = taskSlice.reducer;
export const selectTasks = (state: RootState) => state.task;
