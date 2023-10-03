import React from 'react';

import { Grid, Typography } from '@mui/material';
import { taskSchema } from 'shared/types';
import { filteredArchievedTasks } from 'entities/CardTask/modal/filterTasks';
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

export const ArchievedTaskCardWidget = ({
	child,
	tasks,
	setTasks,
	isLoading,
	setDraggableTask,
	draggableTask,
}: Props) => {
	const filteredChildTasks = filteredArchievedTasks(tasks);

	return (
		<TaskCardTemplate
			setTasks={setTasks}
			child={'Задания в архиве'}
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
					xs={'auto'}
					md={'auto'}
					sx={{ flexGrow: 0, height: 69 }}
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
				archieved
				isLoading={isLoading}
				tasks={tasks}
				setTasks={setTasks}
				setDraggableTask={setDraggableTask}
				draggableTask={draggableTask}
				child={child}
				filteredTasks={filteredChildTasks}
			/>
		</TaskCardTemplate>
	);
};
