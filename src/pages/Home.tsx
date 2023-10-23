import * as React from 'react';
import Grid from '@mui/material/Grid';
import { SearchInput } from 'features/Search/SearchInput';
import { ChildTaskCardWidget } from 'widgets/ChildTaskCardWidget';
import { CompletedTaskCardWidget } from 'widgets/CompletedCardWidget';
import { ArchievedTaskCardWidget } from 'widgets/ArchievedTasksCardWidget';
import { AddTaskDialog } from 'widgets/AddTask';
import { useAppDispatch, useAppSelector } from 'shared/model/hooks';
import { getTasksThunk, selectTasks } from 'entities/CardTask/model/taskSlice';

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
