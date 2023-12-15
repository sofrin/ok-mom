import { Grid } from '@mui/material';
import { getTasksThunk, selectTasks } from 'entities/CardTask/model/taskSlice';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	useAppDispatch,
	useAppSelector,
	useGetUserInfo,
} from 'shared/model/hooks';
import { priorityColor } from 'widgets/ChildViewTaskCard/model/priorityColor';

import Scheduler from 'react-mui-scheduler';

export const ParentSchedule = () => {
	const { parent_id } = useGetUserInfo();
	const dispatch = useAppDispatch();
	useEffect(() => {
		const fetchTasks = async () => {
			await dispatch(getTasksThunk({ str: '', parent_id: parent_id })).unwrap();
		};
		fetchTasks();
	}, [dispatch, parent_id]);

	const tasks = useAppSelector(selectTasks);

	console.log(tasks);

	const navigate = useNavigate();
	const [state] = useState({
		options: {
			transitionMode: 'zoom', // or fade
			startWeekOn: 'mon', // or sun
			defaultMode: 'month', // or week | day | timeline
			minWidth: 540,
			maxWidth: 540,
			minHeight: 540,
			maxHeight: 540,
		},
		alertProps: {
			open: false,
			color: 'info', // info | success | warning | error
			severity: 'info', // info | success | warning | error
			message: "🚀 Let's start with awesome react-mui-scheduler 🔥 🔥 🔥",
			showActionButton: true,
			showNotification: true,
			delay: 1500,
		},
		toolbarProps: {
			showSearchBar: true,
			showSwitchModeButtons: true,
			showDatePicker: true,
		},
	});
	type Event = {
		id: string;
		label: string;
		groupLabel: string;
		user: string;
		color: '#e0e0e0' | '#7986cb' | '#9c27b0' | '#e57373' | undefined;
		startHour: string;
		endHour: string;
		date: string | undefined;
		createdAt: Date | undefined;
		createdBy: string;
	};

	const events = tasks.map((task) => {
		return {
			id: task.id,
			label: task.title,
			groupLabel: task.child,
			user: task.child,
			color: priorityColor(task.priority),
			startHour: '13 PM',
			endHour: '14 PM',
			date: task.date,
			createdAt: task.createdAt,
			createdBy: 'Kristina Mayer',
		};
	});

	const handleCellClick = (
		event: React.MouseEvent,
		row: number,
		day: string,
	) => {
		console.log('handleCellClick', event, row, day);
	};

	const handleEventClick = (event: React.MouseEvent, item: Event) => {
		navigate(`/Home/tasks/${item.id}`);
	};

	const handleEventsChange = (item: Event) => {
		console.log(item);
	};

	const handleAlertCloseButtonClicked = (item: Event) => {
		console.log(item);
	};

	return (
		<Grid
			container
			sx={{ justifyContent: 'center', alignItems: 'center', height: '70vh' }}
		>
			<Grid
				item
				sx={{
					width: 'fit-content',
				}}
			>
				{tasks.length == 0 ? (
					'Загрузка...'
				) : (
					<Scheduler
						locale='en'
						events={events}
						legacyStyle={false}
						options={state?.options}
						alertProps={state?.alertProps}
						toolbarProps={state?.toolbarProps}
						onEventsChange={handleEventsChange}
						onCellClick={handleCellClick}
						onTaskClick={handleEventClick}
						onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
					/>
				)}
			</Grid>
		</Grid>
	);
};
