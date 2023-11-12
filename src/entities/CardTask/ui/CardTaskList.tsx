import React, { DragEvent, Fragment } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import UndoIcon from '@mui/icons-material/Undo';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { taskSchema } from 'shared/types';
import { priorityCircle } from 'features/PriorityCircle/PriorityCircle';
import Divider from '@mui/material/Divider';
import {
	deleteTaskThunk,
	removeTask,
	selectDraggableTask,
	selectTasks,
	setDraggableTask,
	updateTaskThunk,
} from '../model/taskSlice';
import { useAppDispatch, useAppSelector } from 'shared/model/hooks';

type Props = {
	child: string;
	filteredTasks: taskSchema[];
	completed?: boolean;
	archieved?: boolean;
};

export const CardTaskList = ({
	child,
	filteredTasks,
	completed = false,
	archieved = false,
}: Props) => {
	const tasks = useAppSelector(selectTasks);
	const draggableTask = useAppSelector(selectDraggableTask);
	const dispatch = useAppDispatch();
	// const isLoading = useAppSelector(selectLoading);
	let listHeight = 0;
	switch (child) {
		case 'Задания в архиве':
			listHeight = 350;
			break;
		case 'Выполненные задания':
			listHeight = 258;
			break;
		default:
			listHeight = 150;
			break;
	}
	const [parent] = useAutoAnimate();
	const { enqueueSnackbar } = useSnackbar();
	type taskChange = 'isCompleted' | 'isArchived';
	const handleTaskChange = async (
		string: taskChange,
		value: boolean,
		obj: taskSchema,
	) => {
		console.log(obj);
		const chandedObj = { ...obj, [string]: String(value) };
		dispatch(updateTaskThunk(chandedObj))
			.unwrap()
			.then(() =>
				enqueueSnackbar('Task updated successfully', { variant: 'success' }),
			)
			.catch((error) => enqueueSnackbar(error, { variant: 'error' }));
	};
	const handleClickDelete = async (obj: taskSchema) => {
		console.log(obj);
		// setTasks((prev: taskSchema[]) => prev.filter((task) => task.id !== obj.id));
		dispatch(removeTask(obj.id));
		dispatch(deleteTaskThunk(obj.id))
			.unwrap()
			.then(() => {
				enqueueSnackbar('Task deleted successfully', { variant: 'info' });
			})
			.catch((error) => {
				enqueueSnackbar(error, { variant: 'error' });
			});
	};
	function dragOverHandler(e: DragEvent<HTMLLIElement>) {
		e.preventDefault();
	}
	function dragStartHandler(e: DragEvent<HTMLLIElement>, obj: taskSchema) {
		console.log(`dragStartHandler`, obj);
		dispatch(setDraggableTask(obj));
		console.log(`DraggableTask`, draggableTask);
	}

	return (
		<Grid
			item
			container
			direction='column'
			xs={12}
			sx={{
				p: 4,
				height: listHeight,
				overflowY: 'auto',
				overflowX: 'hidden',
				flexGrow: 1,
			}}
		>
			<List
				ref={parent}
				disablePadding
			>
				{
					// !isLoading ?
					filteredTasks.map((obj: taskSchema) => (
						<Fragment key={obj.id}>
							<ListItem
								draggable
								onDragOver={(e) => {
									dragOverHandler(e);
								}}
								onDragStart={(e) => {
									dragStartHandler(e, obj);
								}}
								disablePadding
								sx={{ width: 510 }}
							>
								<ListItemButton>
									<Link
										className='flex items-center flex-1'
										to={`/Home/tasks/${obj.id}`}
										state={{ tasks: tasks }}
									>
										<ListItemIcon sx={{ p: 0, minWidth: 20 }}>
											{priorityCircle(obj.priority)}
										</ListItemIcon>

										<ListItemText primary={obj.title} />
									</Link>
									{completed === false && archieved === false ? (
										<ListItemButton
											onClick={() => handleTaskChange('isCompleted', true, obj)}
											sx={{ maxWidth: 24, padding: 0 }}
										>
											<DoneIcon
												sx={[
													{
														'&:hover': {
															color: 'white',
															background: 'green',
														},
													},
												]}
											/>
										</ListItemButton>
									) : null}
									{completed ? (
										<>
											<ListItemButton
												onClick={() =>
													handleTaskChange('isArchived', true, obj)
												}
												sx={{ maxWidth: 24, padding: 0 }}
											>
												<ThumbUpAltIcon
													sx={[
														{
															'&:hover': {
																color: 'green',
															},
														},
													]}
												/>
											</ListItemButton>{' '}
											<ListItemButton
												onClick={() =>
													handleTaskChange('isCompleted', false, obj)
												}
												sx={{ maxWidth: 24, padding: 0 }}
											>
												<UndoIcon
													sx={[
														{
															'&:hover': {
																color: 'white',
																background: 'green',
															},
														},
														{ marginRight: 1 },
													]}
												/>
											</ListItemButton>{' '}
										</>
									) : null}
									{archieved ? (
										<ListItemButton
											onClick={() => handleTaskChange('isArchived', false, obj)}
											sx={{ maxWidth: 25, padding: 0 }}
										>
											<UndoIcon
												sx={[
													{
														'&:hover': {
															color: 'white',
															background: 'green',
														},
													},
													{ marginRight: 1 },
												]}
											/>
										</ListItemButton>
									) : null}
									<ListItemButton
										onClick={() => handleClickDelete(obj)}
										sx={{ maxWidth: 24, padding: 0 }}
									>
										<DeleteIcon
											sx={[
												{
													'&:hover': {
														color: 'red',
													},
												},
											]}
										/>
									</ListItemButton>
								</ListItemButton>
							</ListItem>
							<Divider />
						</Fragment>
					))
					// : (
					// 	<Skeleton
					// 		variant='rounded'
					// 		width={510}
					// 		height={144}
					// 	/>
					// )
				}
			</List>
		</Grid>
	);
};
