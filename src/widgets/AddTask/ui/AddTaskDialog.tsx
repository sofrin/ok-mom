import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskForm } from 'entities/TaskForm/TaskForm';
import { taskSchema } from 'shared/types';
import { useAppDispatch } from 'shared/model/hooks';

import { useSnackbar } from 'notistack';
import { createTaskThunk } from 'entities/CardTask/model/taskSlice';
type AddTaskDialogProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	defaultChild: string;
};

export const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
	open,
	setOpen,

	defaultChild,
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useAppDispatch();
	const handleClose = () => {
		setOpen(false);
	};
	const onSubmit = async (data: taskSchema) => {
		dispatch(createTaskThunk(data))
			.unwrap()
			.then(() => {
				enqueueSnackbar('Task created successfully', { variant: 'success' });
				reset();
				handleClose();
			})
			.catch((error) => {
				enqueueSnackbar(error, { variant: 'error' });
			});
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<taskSchema>({ resolver: zodResolver(taskSchema) });
	return (
		<>
			<Dialog
				component='form'
				onSubmit={handleSubmit(onSubmit)}
				open={open}
				onClose={handleClose}
				// fullWidth
			>
				<DialogTitle>Добавить задание</DialogTitle>
				<TaskForm
					defaultChild={defaultChild}
					checked={true}
					register={register}
					errors={errors}
				/>

				<DialogActions sx={{ justifyContent: 'space-around' }}>
					<Button
						disabled={isSubmitting}
						type='submit'
						// onClick={handleClose}
					>
						Готово
					</Button>
					<Button onClick={handleClose}>Вернуться</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
