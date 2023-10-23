import React from 'react';

import { Button, Grid, Typography } from '@mui/material';

import { ProgresItem } from '../../features/ProgressItem/ui/ProgressItem';

import { Link } from 'react-router-dom';
import { taskSchema } from 'shared/types';
import { filteredTasks } from 'entities/CardTask/model/filterTasks';
import { points } from 'features/ProgressItem/model/ProgressAlg';
import { TaskCardTemplate } from 'shared/ui/TaskCardTemplate/TaskCardTemplate';
import { Item } from 'shared/ui/Item/Item';
import { CardTaskList } from 'entities/CardTask/ui/CardTaskList';

type Props = {
	child: string;
	tasks: taskSchema[];
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setTasks: React.Dispatch<React.SetStateAction<taskSchema[]>>;
	setdefaultChild: React.Dispatch<React.SetStateAction<string>>;
	isLoading: boolean;
	setDraggableTask: React.Dispatch<
		React.SetStateAction<taskSchema | undefined>
	>;
	draggableTask: taskSchema | undefined;
};

export const ChildTaskCardWidget = ({
	child,
	tasks,
	setOpen,
	setTasks,
	setdefaultChild,
	isLoading,
	setDraggableTask,
	draggableTask,
}: Props) => {
	const handleClickOpen = () => {
		setOpen(true);
		setdefaultChild(child);
	};
	const filteredChildTasks = filteredTasks(tasks, child);
	const totalPoints = points(filteredChildTasks);
	return (
		<TaskCardTemplate
			setTasks={setTasks}
			child={child}
			setDraggableTask={setDraggableTask}
			draggableTask={draggableTask}
		>
			<Grid
				container
				direction='row'
				item
				spacing={1}
				justifyContent='space-between'
			>
				<Grid
					item
					xs={5}
					md={4}
				>
					<Item>
						<Typography
							variant='body1'
							component='h3'
						>
							{child}
						</Typography>
					</Item>
				</Grid>
				<ProgresItem
					points={totalPoints}
					filteredTasks={filteredChildTasks}
				/>
			</Grid>
			<CardTaskList
				isLoading={isLoading}
				tasks={tasks}
				setTasks={setTasks}
				setDraggableTask={setDraggableTask}
				draggableTask={draggableTask}
				child={child}
				filteredTasks={filteredChildTasks}
			/>
			<Grid
				item
				xs={12}
				sx={{ p: 4 }}
			>
				<Link to='#'>Смотреть расписание →</Link>
			</Grid>
			<Grid
				container
				item
			>
				<Grid
					item
					xs={5}
					sx={{ mr: 10 }}
				>
					<Button
						onClick={handleClickOpen}
						sx={{ px: 0 }}
					>
						Добавить задачу +
					</Button>
				</Grid>
				<Grid
					item
					xs={5}
				>
					<Item>Баллы:{totalPoints}</Item>
				</Grid>
			</Grid>
		</TaskCardTemplate>
	);
};
