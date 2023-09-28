import React, { DragEvent } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import {
	ListItem,
	ListItemButton,
	Skeleton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { priorityCircle } from 'src/Components/PriorityCircle';
import DoneIcon from '@mui/icons-material/Done';
import UndoIcon from '@mui/icons-material/Undo';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { taskSchema } from 'src/shared/types';

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
	tasks,
	setTasks,
	isLoading,
	setDraggableTask,
	draggableTask,
	filteredTasks,
	completed = false,
	archieved = false,
}: Props) => {
	const [parent] = useAutoAnimate();

	const handleClickCompleted = async (obj: taskSchema) => {
		console.log(obj);
		const completedObj = { ...obj, isCompleted: 'true' };
		setTasks((prev: taskSchema[]) => prev.filter((task) => task.id !== obj.id));
		setTasks((prev) => [...prev, completedObj]);

		const response = await fetch(
			'https://64f8d138824680fd21801557.mockapi.io/tasks/' + obj.id,
			{
				method: 'PUT',
				headers: { 'content-type': 'application/json' },
				// Send your data in the request body as JSON
				body: JSON.stringify({ isCompleted: 'true' }),
			},
		);
		if (response.ok) {
			alert('Task completed successfully');
			return;
		} else {
			alert('failed');
			return;
		}
	};
	const handleClickUnArchive = async (obj: taskSchema) => {
		console.log(obj);
		const unCompletedObj = { ...obj, isArchived: 'false' };
		setTasks((prev: taskSchema[]) => prev.filter((task) => task.id !== obj.id));
		setTasks((prev) => [...prev, unCompletedObj]);

		const response = await fetch(
			'https://64f8d138824680fd21801557.mockapi.io/tasks/' + obj.id,
			{
				method: 'PUT',
				headers: { 'content-type': 'application/json' },
				// Send your data in the request body as JSON
				body: JSON.stringify({ isArchived: 'false' }),
			},
		);
		if (response.ok) {
			alert('Task UnArchived successfully');
			return;
		} else {
			alert('failed');
			return;
		}
	};
	const handleClickAchive = async (obj: taskSchema) => {
		console.log(obj);
		const completedObj = { ...obj, isArchived: 'true' };
		setTasks((prev: taskSchema[]) => prev.filter((task) => task.id !== obj.id));
		setTasks((prev) => [...prev, completedObj]);

		const response = await fetch(
			'https://64f8d138824680fd21801557.mockapi.io/tasks/' + obj.id,
			{
				method: 'PUT',
				headers: { 'content-type': 'application/json' },
				// Send your data in the request body as JSON
				body: JSON.stringify({ isArchived: 'true' }),
			},
		);
		if (response.ok) {
			alert('Task archived successfully');
			return;
		} else {
			alert('failed');
			return;
		}
	};
	const handleClickUndo = async (obj: taskSchema) => {
		console.log(obj);
		const unCompletedObj = { ...obj, isCompleted: 'false' };
		setTasks((prev: taskSchema[]) => prev.filter((task) => task.id !== obj.id));
		setTasks((prev) => [...prev, unCompletedObj]);

		const response = await fetch(
			'https://64f8d138824680fd21801557.mockapi.io/tasks/' + obj.id,
			{
				method: 'PUT',
				headers: { 'content-type': 'application/json' },
				// Send your data in the request body as JSON
				body: JSON.stringify({ isCompleted: 'false' }),
			},
		);
		if (response.ok) {
			alert('Task Uncompleted successfully');
			return;
		} else {
			alert('failed');
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
			alert('Task deleted successfully');
			return;
		} else {
			alert('failed');
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
	// function dropHandler(e: DragEvent<HTMLLIElement>,): void {
	//   e.preventDefault()
	//   console.log(`dropHandler`, filteredTasks);
	//   console.log(`draggableTask`, draggableTask);
	//   if (draggableTask) {
	//     console.log(`child`, child);

	//     fetch(
	//       'https://64f8d138824680fd21801557.mockapi.io/tasks/' + draggableTask.id,
	//       {
	//         method: 'PUT',
	//         headers: { 'content-type': 'application/json' },
	//         // Send your data in the request body as JSON
	//         body: JSON.stringify(draggableTask)
	//       },
	//     );
	//     setTasks((prev: taskSchema[]) => prev.filter((task) => task.id !== draggableTask.id))
	//     setTasks((prev) => [...prev, draggableTask])
	//     setDraggableTask(undefined)
	//     console.log(`dropHandler`, filteredTasks);
	//   }
	// }

	return (
		<>
			<Grid
				item
				xs={12}
			>
				<Typography>Список задач:</Typography>
			</Grid>
			<Grid
				item
				container
				direction='column'
				xs={12}
				sx={{
					p: 4,
					height: 150,
					overflowY: 'auto',
					overflowX: 'hidden',
					flexGrow: 0,
				}}
			>
				<List
					ref={parent}
					disablePadding
				>
					{!isLoading ? (
						filteredTasks.map((obj: taskSchema) => (
							<ListItem
								draggable
								onDragOver={(e) => {
									dragOverHandler(e);
								}}
								onDragStart={(e) => {
									dragStartHandler(e, obj);
								}}
								// onDrop={(e) => dropHandler(e)}
								key={obj.id}
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
											onClick={() => handleClickCompleted(obj)}
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
												onClick={() => handleClickAchive(obj)}
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
												onClick={() => handleClickUndo(obj)}
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
											onClick={() => handleClickUnArchive(obj)}
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
						))
					) : (
						<Skeleton
							variant='rounded'
							width={510}
							height={144}
						/>
					)}
				</List>
			</Grid>
		</>
	);
};
