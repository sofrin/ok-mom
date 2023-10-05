import React, { DragEvent, Fragment } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import {
	ListItem,
	ListItemButton,
	Skeleton,
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

type Props = {
	tasks: taskSchema[];
	setTasks: React.Dispatch<React.SetStateAction<taskSchema[]>>;
	isLoading: boolean;
	setDraggableTask: React.Dispatch<
		React.SetStateAction<taskSchema | undefined>
	>;
	draggableTask: taskSchema | undefined;
	child: string;
	filteredTasks: taskSchema[];
	completed?: boolean;
	archieved?: boolean;
};

export const CardTaskList = ({
	child,
	tasks,
	setTasks,
	isLoading,
	setDraggableTask,
	draggableTask,
	filteredTasks,
	completed = false,
	archieved = false,
}: Props) => {
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
		setTasks((prev: taskSchema[]) => prev.filter((task) => task.id !== obj.id));
		setTasks((prev) => [...prev, chandedObj]);

		const response = await fetch(
			'https://64f8d138824680fd21801557.mockapi.io/tasks/' + obj.id,
			{
				method: 'PUT',
				headers: { 'content-type': 'application/json' },
				// Send your data in the request body as JSON
				body: JSON.stringify({ [string]: String(value) }),
			},
		);
		if (response.ok) {
			enqueueSnackbar('Task updated successfully', { variant: 'success' });
			return;
		} else {
			enqueueSnackbar('Something went wrong', { variant: 'error' });
			return;
		}
	};
	const handleClickDelete = async (obj: taskSchema) => {
		console.log(obj);
		setTasks((prev: taskSchema[]) => prev.filter((task) => task.id !== obj.id));

		const response = await fetch(
			'https://64f8d138824680fd21801557.mockapi.io/tasks/' + obj.id,
			{
				method: 'DELETE',
			},
		);
		if (response.ok) {
			enqueueSnackbar('Task deleted successfully', { variant: 'info' });
			return;
		} else {
			enqueueSnackbar('Something went wrong', { variant: 'error' });
			return;
		}
	};
	function dragOverHandler(e: DragEvent<HTMLLIElement>) {
		e.preventDefault();
	}
	function dragStartHandler(e: DragEvent<HTMLLIElement>, obj: taskSchema) {
		console.log(`dragStartHandler`, obj);
		setDraggableTask(obj);
		console.log(`DraggableTask`, draggableTask);
		// obj.child = ''
		// obj.isArchived = 'false'
		// obj.isCompleted = 'false'
		// setTasks((prev) => prev.filter((task) => task.id !== obj.id))

		console.log(`dragStartHandler`, obj);
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
				{!isLoading ? (
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
								// onDrop={(e) => dropHandler(e)}

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
				) : (
					<Skeleton
						variant='rounded'
						width={510}
						height={144}
					/>
				)}
			</List>
			<Divider />
		</Grid>
	);
};
