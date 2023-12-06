import React, { DragEvent, ReactNode } from 'react';
import { Grid, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from 'shared/model/hooks';
import {
	selectDraggableTask,
	setDraggableTask,
} from '../../../entities/CardTask/model/taskSlice';
import {
	addTask,
	removeTask,
	updateTaskThunk,
} from 'entities/CardTask/model/taskSlice';
import { taskSchema } from 'shared/types';

type Props = {
	child: string;
	children: ReactNode;
};

export const TaskCardTemplate = ({ child, children }: Props) => {
	const draggableTask = useAppSelector(selectDraggableTask);
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();
	async function dropHandler(e: DragEvent) {
		e.preventDefault();
		console.log(`draggableTask`, draggableTask);
		let chandedObj = {};
		switch (child) {
			case 'Выполненые задания':
				chandedObj = {
					...draggableTask,
					isArchived: 'false',
					isCompleted: 'true',
				};
				break;
			case 'Задания в архиве':
				chandedObj = {
					...draggableTask,
					isArchived: 'true',
					isCompleted: 'true',
				};
				break;
			default:
				chandedObj = {
					...draggableTask,
					child: child,
					isArchived: 'false',
					isCompleted: 'false',
				};
				break;
		}
		dispatch(removeTask(draggableTask?.id));
		console.log(draggableTask);
		dispatch(addTask(chandedObj));
		dispatch(updateTaskThunk(chandedObj as taskSchema))
			.unwrap()
			.then(() => {
				dispatch(setDraggableTask(null));
				enqueueSnackbar('Task updated successfully', { variant: 'success' });
			})
			.catch((error) => {
				enqueueSnackbar(error, { variant: 'error' });
			});
	}
	function dragOverHandler(e: DragEvent) {
		e.preventDefault();
	}
	return (
		<>
			<Grid
				onDrop={(e) => dropHandler(e)}
				onDragOver={(e) => {
					dragOverHandler(e);
				}}
				item
				xs={12}
				md={12}
				lg={12}
			>
				<Paper
					sx={{
						p: 3,
						display: 'flex',
						flexDirection: 'column',
						height: 450,
					}}
				>
					<Grid
						container
						direction='row'
						spacing={1}
						sx={{
							height: 450,
							alignItems: 'flex-start',
							marginLeft: '-4px',
						}}
					>
						{children}
					</Grid>
				</Paper>
			</Grid>
		</>
	);
};
