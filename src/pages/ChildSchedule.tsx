import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
} from '@mui/material';
import { getTasksThunk, selectTasks } from 'entities/CardTask/model/taskSlice';

import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector, useAuth } from 'shared/model/hooks';
import { priorityColor } from 'widgets/ChildViewTaskCard/model/priorityColor';

import { filteredTasks } from 'entities/CardTask/model/filterTasks';
import Scheduler from 'react-mui-scheduler';

type Event = {
	taskType: 'daily' | 'todo' | 'habit';
	points: number;
	priority: 'low' | 'mid' | 'high' | 'critical';
	description: string;
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
export const ChildSchedule = () => {
	const isAuth = useAuth();
	const dispatch = useAppDispatch();
	useEffect(() => {
		const fetchTasks = async () => {
			await dispatch(getTasksThunk('')).unwrap();
		};
		fetchTasks();
	}, [dispatch]);
	const tasks = useAppSelector(selectTasks);
	let username = '';
	if (isAuth.user?.role === 'child') {
		username = isAuth.user.name;
	}
	if (isAuth.user?.role === 'parent') {
		username = isAuth.user.children[0].name;
	}
	const childTasks = filteredTasks(tasks, username);

	console.log(tasks);
	const [open, setOpen] = useState(false);
	const [item, setItem] = useState({} as Event);
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

	const events = childTasks.map((task) => {
		return {
			taskType: task.taskType,
			points: task.points,
			priority: task.priority,
			description: task.description,
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
		setItem(item);
		setOpen(true);
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
				<Dialog
					open={open}
					onClose={() => setOpen(false)}
				>
					<DialogTitle>{item.label}</DialogTitle>
					<DialogContent>
						<DialogContentText>Описание: {item.description}</DialogContentText>
						<DialogContentText>Награда: {item.points} баллов</DialogContentText>
						<DialogContentText> Дата: {item.date}</DialogContentText>
						<DialogContentText> Приоритет: {item.priority}</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setOpen(false)}>Close</Button>
					</DialogActions>
				</Dialog>
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
