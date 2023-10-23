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
	// const onSubmit = async (data: taskSchema) => {
	// 	const maxIdObj: taskSchema = tasks.reduce((prev, current) => {
	// 		return prev.id > current.id ? prev : current;
	// 	});
	// 	data.id = String(Number(maxIdObj.id) + 1);
	// 	console.log(data);
	// 	setTasks((prev: taskSchema[]) => [...prev, data]);
	// 	const response = await fetch(
	// 		'https://64f8d138824680fd21801557.mockapi.io/tasks',
	// 		{
	// 			method: 'POST',
	// 			headers: { 'content-type': 'application/json' },
	// 			// Send your data in the request body as JSON
	// 			body: JSON.stringify(data),
	// 		},
	// 	);
	// 	if (response.ok) {
	// 		alert('Form submited successfully');
	// 		reset();
	// 		handleClose();
	// 		return;
	// 	} else {
	// 		alert('Form submition failed');
	// 		return;
	// 	}
	// };
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
				{/* <DialogContent sx={{ width: 600 }} >
          {errors.description && (
            <p className='text-red-100'> {`${errors.description.message}`}</p>
          )}
          {errors.child && (
            <p className='text-red-200'> {`${errors.child.message}`}</p>
          )}
          {errors.priority && (
            <p className='text-red-300'> {`${errors.priority.message}`}</p>
          )}
          {errors.root && (
            <p className='text-red-400'> {`${errors.root.message}`}</p>
          )}
          {errors.date && (
            <p className='text-red-500'> {`${errors.date.message}`}</p>
          )}
          {errors.points && (
            <p className='text-red-600'> {`${errors.points.message}`}</p>
          )}
          <div className='flex items-center'>
            <DialogContentText>Задача для:</DialogContentText>

            <Select
              defaultValue={defaultChild}
              id='child'
              label='Ребёнок'
              {...register('child')}
            >
              <MenuItem value={'Ребёнок 1'}>Ребёнок 1</MenuItem>
              <MenuItem value={'Ребёнок 2'}>Ребёнок 2</MenuItem>
            </Select>
          </div>
          <div className="flex flex-col">
            <TextField
              sx={{ mr: 10 }}
              autoFocus
              margin='dense'
              id='title'
              label='НАЗВАНИЕ ЗАДАНИЯ'
              type='text'
              variant='standard'
              {...register('title')}
            />
            <TextField
              autoFocus
              margin='dense'
              id='points'
              label='Баллы'
              type='number'
              variant='outlined'
              {...register('points', { valueAsNumber: true, })}
            />
            <DialogContentText>Тип задания:</DialogContentText>

            <Select
              id='taskType'
              label='Type'
              defaultValue={'Ежедневно'}
              {...register('taskType')}
            >
              <MenuItem value={'Ежедневно'}>Ежедневно</MenuItem>
              <MenuItem value={'Единоразово'}>Единоразово</MenuItem>
            </Select>
            <TextField
              minRows='3'
              multiline
              autoFocus
              margin='dense'
              id='description'
              label='Описание задания'
              type='text'
              variant='filled'
              {...register('description')}
            />
            <TextField
              autoFocus
              margin='dense'
              id='file'
              type='file'
              variant='outlined'
            />
            <DialogContentText>Приоритет задания:</DialogContentText>
            <Select
              id='priority'
              label='Приоритет'
              variant='outlined'
              defaultValue={'Средний'}
              {...register('priority')}
            >
              <MenuItem value={'Низкий'}>Низкий</MenuItem>
              <MenuItem value={'Средний'}>Средний</MenuItem>
              <MenuItem value={'Высокий'}>Высокий</MenuItem>
              <MenuItem value={'Критический'}>Критический</MenuItem>
            </Select>
            <TextField
              autoFocus
              margin='dense'
              id='date'
              type='date'
              variant='standard'
              {...register('date')}
            />
            <TextField
              autoFocus
              margin='dense'
              id='tags'
              label='Тэги'
              type='text'
              variant='standard'
              helperText='Указывайте тэги через запятую'
              {...register('tags')}
            />
          </div>
        </DialogContent> */}
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
