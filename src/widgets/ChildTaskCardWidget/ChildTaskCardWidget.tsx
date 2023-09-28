import React from 'react';
import { TaskCardTemplate } from 'src/shared/ui/TaskCardTemplate/TaskCardTemplate';
import { Button, Grid, Typography } from '@mui/material';
import { Item } from 'src/shared/ui/Item/Item';
import { ProgresItem } from '../../features/ProgressItem/ui/ProgressItem';
import { filteredTasks } from 'src/entities/CardTask/modal/filterTasks';
import { CardTaskList } from 'src/entities/CardTask/ui/CardTaskList';
import { Link } from 'react-router-dom';
import { points } from 'src/features/ProgressItem/modal/ProgressAlg';
import { taskSchema } from 'src/shared/types';

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

const ChildTaskCardWidget = ({
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

export default ChildTaskCardWidget;
