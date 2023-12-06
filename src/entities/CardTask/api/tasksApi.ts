import { api } from 'shared/api/baseApi';
import { TASK_TAG } from 'shared/api/tags';
import { taskSchema } from 'shared/types';
import { updateTaskRequest } from '../model/taskSlice';

export const tasksApi = api.injectEndpoints({
	endpoints: (build) => ({
		getTasks: build.query<taskSchema[], void | string>({
			query: (str) => `https://64f8d138824680fd21801557.mockapi.io/tasks${str}`,
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
		getOneTask: build.query<taskSchema, string>({
			query: (id) => `https://64f8d138824680fd21801557.mockapi.io/tasks/${id}`,
			providesTags: (result, error, id) => [{ type: TASK_TAG, id }],
		}),
		createTask: build.mutation<void, taskSchema>({
			query: (body) => ({
				url: 'https://64f8d138824680fd21801557.mockapi.io/tasks',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: TASK_TAG, id: 'LIST' }],
		}),
		updateTask: build.mutation<void, updateTaskRequest>({
			query: (body) => ({
				url: `https://64f8d138824680fd21801557.mockapi.io/tasks/${body.id}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: [{ type: TASK_TAG, id: 'LIST' }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				console.log('PATCH', body);
				const patchResult = dispatch(
					tasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
						// Object.assign(draft, patch);
						draft.push(body as taskSchema);
					}),
				);
				console.log('PATCH RESULT', patchResult);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
		}),
		deleteTask: build.mutation<void, string>({
			query: (id) => ({
				url: `https://64f8d138824680fd21801557.mockapi.io/tasks/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, id) => [{ type: TASK_TAG, id }],
		}),
	}),
});

export const {
	useGetTasksQuery,
	useCreateTaskMutation,
	useUpdateTaskMutation,
	useDeleteTaskMutation,
	useGetOneTaskQuery,
} = tasksApi;
