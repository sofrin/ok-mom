import React from 'react';

import { Grid, Typography } from '@mui/material';
import { taskSchema } from 'shared/types';
import { filteredCompletedTasks } from 'entities/CardTask/model/filterTasks';
import { points } from 'features/ProgressItem/model/ProgressAlg';
import { TaskCardTemplate } from 'shared/ui/TaskCardTemplate/TaskCardTemplate';
import { Item } from 'shared/ui/Item/Item';
import { CardTaskList } from 'entities/CardTask/ui/CardTaskList';

type Props = {
	child: string;
	tasks: taskSchema[];
	setTasks: React.Dispatch<React.SetStateAction<taskSchema[]>>;
	isLoading: boolean;
	setDraggableTask: React.Dispatch<
		React.SetStateAction<taskSchema | undefined>
	>;
	draggableTask: taskSchema | undefined;
};

export const CompletedTaskCardWidget = ({
	child,
	tasks,
	setTasks,
	isLoading,
	setDraggableTask,
	draggableTask,
}: Props) => {
	const filteredChildTasks = filteredCompletedTasks(tasks);
	const totalPoints = points(filteredChildTasks);

	return (
		<TaskCardTemplate
			setTasks={setTasks}
			child={'Выполненые задания'}
			setDraggableTask={setDraggableTask}
			draggableTask={draggableTask}
		>
			<Grid
				container
				direction='row'
				item
				spacing={0}
				sx={{ flexGrow: 0, height: 50 }}
			>
				<Grid
					item
					xs={'auto'}
					md={'auto'}
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
			</Grid>
			<CardTaskList
				completed
				isLoading={isLoading}
				tasks={tasks}
				setTasks={setTasks}
				setDraggableTask={setDraggableTask}
				draggableTask={draggableTask}
				child={child}
				filteredTasks={filteredChildTasks}
			/>
			{/* <Grid
				item
				xs={12}
				sx={{ p: 4, visibility: 'hidden' }}
			>
				<div>Смотреть расписание →</div>
			</Grid> */}
			<Grid
				container
				item
			>
				<Grid
					item
					xs={5}
				>
					<Item>Полученные баллы:{totalPoints}</Item>
				</Grid>
			</Grid>
		</TaskCardTemplate>
	);
};

export default CompletedTaskCardWidget;
