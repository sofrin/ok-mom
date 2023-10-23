import { api } from 'shared/api/baseApi';
import { TASK_TAG } from 'shared/api/tags';
import { taskSchema } from 'shared/types';

export const tasksApi = api.injectEndpoints({
	endpoints: (build) => ({
		getTasks: build.query<taskSchema[], void>({
			query: () => 'https://64f8d138824680fd21801557.mockapi.io/tasks',
			providesTags: (result) => {
				return result
					? [
							...result.map(({ id }) => ({ type: TASK_TAG, id } as const)),
							{ type: TASK_TAG, id: 'LIST' },
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ]
					: [{ type: TASK_TAG, id: 'LIST' }];
			},
		}),
		createTask: build.mutation<void, taskSchema>({
			query: (body) => ({
				url: 'https://64f8d138824680fd21801557.mockapi.io/tasks',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: TASK_TAG, id: 'LIST' }],
		}),
		updateTask: build.mutation<void, taskSchema>({
			query: (body) => ({
				url: `https://64f8d138824680fd21801557.mockapi.io/tasks/${body.id}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: [{ type: TASK_TAG, id: 'LIST' }],
		}),
		deleteTask: build.mutation<void, string>({
			query: (id) => ({
				url: `https://64f8d138824680fd21801557.mockapi.io/tasks/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: TASK_TAG, id: 'LIST' }],
		}),
	}),
});

export const {
	useGetTasksQuery,
	useCreateTaskMutation,
	useUpdateTaskMutation,
	useDeleteTaskMutation,
} = tasksApi;
