import Grid from '@mui/material/Grid';
import { getTasksThunk, selectTasks } from 'entities/CardTask/model/taskSlice';
import { SearchInput } from 'features/Search/SearchInput';
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useAuth } from 'shared/model/hooks';
import { AddTaskDialog } from 'widgets/AddTask';
import { ArchievedTaskCardWidget } from 'widgets/ArchievedTasksCardWidget';
import { ChildTaskCardWidget } from 'widgets/ChildTaskCardWidget';
import { CompletedTaskCardWidget } from 'widgets/CompletedCardWidget';

export default function Home() {
	const isAuth = useAuth();
	const dispatch = useAppDispatch();
	const [openForm, setOpenForm] = React.useState(false);

	const [defaultChild, setdefaultChild] = React.useState('');

	React.useEffect(() => {
		const fetchTasks = async () => {
			dispatch(getTasksThunk('')).unwrap();
		};
		fetchTasks();
	}, [dispatch]);
	const tasks = useAppSelector(selectTasks);

	console.log(isAuth.user?.login);

	console.log(tasks);
	if (!isAuth.user || isAuth.user.role !== 'parent') {
		return <Navigate to='/signIn' />;
	}
	return (
		<>
			<SearchInput />
			<Grid
				container
				spacing={3}
			>
				{isAuth.user.children.map((child) => (
					<Grid
						item
						xs={6}
						md={4}
						lg={6}
					>
						<ChildTaskCardWidget
							key={child.name}
							child={child.name}
							setdefaultChild={setdefaultChild}
							setOpen={setOpenForm}
						/>
					</Grid>
				))}

				<Grid
					item
					xs={6}
					md={4}
					lg={6}
				>
					<CompletedTaskCardWidget child='Выполненные задания' />
				</Grid>
				<Grid
					item
					xs={6}
					md={4}
					lg={6}
				>
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
