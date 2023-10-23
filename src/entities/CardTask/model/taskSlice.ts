import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tasksApi } from '../api/tasksApi';
import { RootState } from 'shared/redux/store';
import { isFetchBaseQueryError } from 'shared/api/isFetchBaseQueryError';
import { taskSchema } from 'shared/types';

export const getTasksThunk = createAsyncThunk<
	void,
	void | string,
	{ state: RootState }
>('task/getTasks', async (str, { dispatch }) => {
	try {
		await dispatch(tasksApi.endpoints.getTasks.initiate(str)).unwrap();
	} catch (error) {
		if (isFetchBaseQueryError(error)) {
			if (typeof error.data === 'string') {
				throw new Error(error.data);
			}
		}
		throw new Error('Unknown error');
	}
});
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
			throw new Error('Unknown error');
		}
	}
});
export type updateTaskRequest = Pick<taskSchema, 'id'> & Partial<taskSchema>;
export const updateTaskThunk = createAsyncThunk<
	void,
	updateTaskRequest,
	{ state: RootState }
>('task/updateTask', async (body: updateTaskRequest, { dispatch }) => {
	try {
		await dispatch(tasksApi.endpoints.updateTask.initiate(body)).unwrap();
	} catch (error) {
		if (isFetchBaseQueryError(error)) {
			if (typeof error.data === 'string') {
				throw new Error(error.data);
			}
		}
		throw new Error('Unknown error');
	}
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
		throw new Error('Unknown error');
	}
});

export const getOneTaskThunk = createAsyncThunk<
	taskSchema,
	string,
	{ state: RootState }
>('task/getOneTask', async (id: string, { dispatch }) => {
	try {
		const res = await dispatch(
			//   ^?
			tasksApi.endpoints.getOneTask.initiate(id),
		).unwrap();

		return res;
	} catch (error) {
		if (isFetchBaseQueryError(error)) {
			if (typeof error.data === 'string') {
				throw new Error(error.data);
			}
		}
		throw new Error('Unknown error');
	}
});

type taskSliceType = {
	items: taskSchema[];
	isLoading: boolean;
	draggableTask: taskSchema | null;
};
const initialState: taskSliceType = {
	items: [],
	isLoading: false,
	draggableTask: null,
};
const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		addTask(state, action) {
			state.items.push(action.payload);
		},
		removeTask(state, action) {
			state.items = state.items.filter((item) => item.id !== action.payload);
		},
		setDraggableTask(state, action) {
			state.draggableTask = action.payload;
		},
		setDraggableTaskCompleted(state) {
			if (state.draggableTask) {
				state.draggableTask.isArchived = 'false';
				state.draggableTask.isCompleted = 'true';
			}
		},
		setDraggableTaskArchieved(state) {
			if (state.draggableTask) {
				state.draggableTask.isArchived = 'true';
				state.draggableTask.isCompleted = 'true';
			}
		},
		setDraggableTaskChild(state, action) {
			if (state.draggableTask) {
				state.draggableTask.title = action.payload;
				state.draggableTask.child = action.payload;
				state.draggableTask.isArchived = 'false';
				state.draggableTask.isCompleted = 'false';
				addTask(state.draggableTask);
			}
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(tasksApi.endpoints.getTasks.matchPending, (state) => {
			state.isLoading = true;
		});
		builder.addMatcher(
			tasksApi.endpoints.getTasks.matchFulfilled,
			(state, action) => {
				state.items = action.payload;
				state.isLoading = false;
			},
		);
	},
});

export const taskReducer = taskSlice.reducer;
export const selectTasks = (state: RootState) => state.task.items;
export const selectLoading = (state: RootState) => state.task.isLoading;
export const selectDraggableTask = (state: RootState) =>
	state.task.draggableTask;
export const {
	addTask,
	removeTask,
	setDraggableTask,
	setDraggableTaskCompleted,
	setDraggableTaskArchieved,
	setDraggableTaskChild,
} = taskSlice.actions;
