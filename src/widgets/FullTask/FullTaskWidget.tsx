import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DialogTitle from '@mui/material/DialogTitle';
import { Paper, Grid, Switch, FormControlLabel } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import { taskSchema } from 'shared/types';
import { TaskForm } from 'entities/TaskForm/TaskForm';
import { useSnackbar } from 'notistack';
import { useAppDispatch } from 'shared/model/hooks';
import {
	getOneTaskThunk,
	updateTaskThunk,
} from 'entities/CardTask/model/taskSlice';

const FullTask: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<taskSchema>();
	const { id } = useParams();
	console.log(`id из useParams`, id);

	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useAppDispatch();
	const [singleTask, setSingleTask] = useState<taskSchema>();
	const [checked, setChecked] = useState(false);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};

	useEffect(() => {
		async function fetchTask() {
			if (id)
				dispatch(getOneTaskThunk(id))
					.unwrap()
					.then((res) => {
						setSingleTask(res);
					})
					.catch((error) => enqueueSnackbar(error, { variant: 'error' }));
		}
		fetchTask();
	}, [dispatch, id, enqueueSnackbar]);
	if (!singleTask) {
		return <div>Загрузка...</div>;
	}
	const handleClose = () => {
		navigate(-1);
	};
	const onSubmit = async (data: taskSchema) => {
		console.log(`данные из измененной формы`, data);
		data.id = id as unknown as string;

		dispatch(updateTaskThunk(data))
			.unwrap()
			.then(() => {
				enqueueSnackbar('Task updated successfully', { variant: 'success' });
				handleClose();
			})
			.catch((error) => {
				enqueueSnackbar(error, { variant: 'error' });
			});
	};

	return (
		<Grid
			item
			sx={{ marginLeft: 'auto', marginRight: 'auto', width: 'fit-content' }}
		>
			<Paper
				sx={{
					p: 3,
					display: 'flex',
					flexDirection: 'column',
					width: 'fit-content',
				}}
			>
				<Box
					component='form'
					onSubmit={handleSubmit(onSubmit)}
					// fullWidth
				>
					<DialogTitle>Редактировать задание</DialogTitle>

					<FormControlLabel
						sx={{ ml: 2 }}
						control={
							<Switch
								checked={checked}
								onChange={handleChange}
							/>
						}
						label='edit'
					/>
					<TaskForm
						checked={checked}
						singleTask={singleTask}
						register={register}
						errors={errors}
					/>

					<DialogActions sx={{ justifyContent: 'flex-start' }}>
						<Button
							disabled={isSubmitting}
							type='submit'
						>
							Готово
						</Button>
						<Button onClick={handleClose}>Вернуться</Button>
					</DialogActions>
				</Box>
			</Paper>
		</Grid>
	);
};
export default FullTask;
