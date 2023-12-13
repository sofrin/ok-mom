import Grid from '@mui/material/Grid';
import { getTasksThunk, selectTasks } from 'entities/CardTask/model/taskSlice';
import { SearchInput } from 'features/Search/SearchInput';
import * as React from 'react';
import { useAppDispatch, useAppSelector, useAuth } from 'shared/model/hooks';
import { AddTaskDialog } from 'widgets/AddTask';
import { ArchievedTaskCardWidget } from 'widgets/ArchievedTasksCardWidget';
import { ChildTaskCardWidget } from 'widgets/ChildTaskCardWidget';
import { CompletedTaskCardWidget } from 'widgets/CompletedCardWidget';

export default function Home() {
	const dispatch = useAppDispatch();
	const [openForm, setOpenForm] = React.useState(false);
	const [defaultChild, setdefaultChild] = React.useState('Ребёнок 1');

	React.useEffect(() => {
		const fetchTasks = async () => {
			dispatch(getTasksThunk('')).unwrap();
		};
		fetchTasks();
	}, [dispatch]);
	const tasks = useAppSelector(selectTasks);
	const isAuth = useAuth();
	console.log(isAuth.user?.login);

	console.log(tasks);

	return (
		<>
			<SearchInput />
			<Grid
				container
				spacing={3}
			>
				<Grid
					item
					xs={6}
					md={4}
					lg={6}
				>
					{' '}
					<ChildTaskCardWidget
						key={`Ребёнок 1`}
						child='Ребёнок 1'
						setOpen={setOpenForm}
						setdefaultChild={setdefaultChild}
					/>
				</Grid>
				<Grid
					item
					xs={6}
					md={4}
					lg={6}
				>
					{' '}
					<ChildTaskCardWidget
						key={`Ребёнок 2`}
						child='Ребёнок 2'
						setOpen={setOpenForm}
						setdefaultChild={setdefaultChild}
					/>
				</Grid>

				<Grid
					item
					xs={6}
					md={4}
					lg={6}
				>
					{' '}
					<CompletedTaskCardWidget child='Выполненные задания' />
				</Grid>
				<Grid
					item
					xs={6}
					md={4}
					lg={6}
				>
					{' '}
					<ArchievedTaskCardWidget child='Задания в архиве' />
				</Grid>
				<Grid
					item
					xs={6}
					md={4}
					lg={6}
				>
					{openForm && (
						<AddTaskDialog
							open={openForm}
							setOpen={setOpenForm}
							defaultChild={defaultChild}
						/>
					)}
				</Grid>
			</Grid>
		</>
	);
}
