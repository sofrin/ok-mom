import React from 'react';

import { Button, Grid, Typography } from '@mui/material';

import { ProgresItem } from '../../features/ProgressItem/ui/ProgressItem';

import { Link } from 'react-router-dom';

import { points } from 'features/ProgressItem/model/ProgressAlg';
import { TaskCardTemplate } from 'shared/ui/TaskCardTemplate/TaskCardTemplate';
import { Item } from 'shared/ui/Item/Item';
import { CardTaskList } from 'entities/CardTask/ui/CardTaskList';
import { filteredTasks } from 'entities/CardTask/model/filterTasks';
import { useAppSelector } from 'shared/model/hooks';
import { tasksApi } from 'entities/CardTask/api/tasksApi';
import { createSelector } from '@reduxjs/toolkit';
import { taskSchema } from 'shared/types';

type Props = {
	child: string;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setdefaultChild: React.Dispatch<React.SetStateAction<string>>;
};

export const ChildTaskCardWidget = ({
	child,
	setOpen,
	setdefaultChild,
}: Props) => {
	const selectTasksResult = tasksApi.endpoints.getTasks.select('');

	const emptyTasks: taskSchema[] = [];

	const selectAllTasks = createSelector(
		selectTasksResult,
		(usersResult) => usersResult?.data ?? emptyTasks,
	);

	const tasks = useAppSelector(selectAllTasks);
	const handleClickOpen = () => {
		setOpen(true);
		setdefaultChild(child);
	};
	const filteredChildTasks = filteredTasks(tasks, child);
	const totalPoints = points(filteredChildTasks);
	return (
		<TaskCardTemplate child={child}>
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
