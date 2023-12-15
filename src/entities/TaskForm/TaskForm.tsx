import {
	DialogContent,
	DialogContentText,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useAuth } from 'shared/model/hooks';
import { Child, taskSchema } from 'shared/types';

type TaskFormProps = {
	checked?: boolean;
	singleTask?: taskSchema;
	defaultChild?: string;
	register: UseFormRegister<taskSchema>;
	errors: FieldErrors<taskSchema>;
};

export const TaskForm = ({
	checked,
	singleTask,
	defaultChild,
	errors,
	register,
}: TaskFormProps) => {
	const isAuth = useAuth();
	let children: Child[] = [];
	if (isAuth.user && isAuth.user.role === 'parent') {
		children = isAuth.user?.children;
	}

	return (
		<DialogContent sx={{ width: 600 }}>
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
					disabled={!checked}
					defaultValue={singleTask ? singleTask.child : defaultChild}
					id='child'
					label='Ребёнок'
					{...register('child')}
				>
					{children.map((child) => (
						<MenuItem
							key={child.name}
							value={child.name}
						>
							{child.name}
						</MenuItem>
					))}
				</Select>
			</div>
			<div className='flex flex-col'>
				<TextField
					defaultValue={singleTask && singleTask.title}
					disabled={!checked}
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
					defaultValue={singleTask && singleTask.points}
					disabled={!checked}
					autoFocus
					margin='dense'
					id='points'
					label='Баллы'
					type='number'
					variant='outlined'
					{...register('points', { valueAsNumber: true })}
				/>
				<DialogContentText>Тип задания:</DialogContentText>
				<Select
					defaultValue={singleTask ? singleTask.taskType : 'daily'}
					disabled={!checked}
					id='taskType'
					label='Type'
					{...register('taskType')}
				>
					<MenuItem value={'daily'}>Ежедневно</MenuItem>
					<MenuItem value={'habit'}>Привычка</MenuItem>
					<MenuItem value={'todo'}>Единоразово</MenuItem>
				</Select>
				<TextField
					defaultValue={singleTask && singleTask.description}
					disabled={!checked}
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
				<DialogContentText>Приоритет задания:</DialogContentText>
				<Select
					defaultValue={singleTask ? singleTask.priority : 'mid'}
					disabled={!checked}
					id='priority'
					label='Приоритет'
					variant='outlined'
					{...register('priority')}
				>
					<MenuItem value={'low'}>Низкий</MenuItem>
					<MenuItem value={'mid'}>Средний</MenuItem>
					<MenuItem value={'high'}>Высокий</MenuItem>
					<MenuItem value={'critical'}>Критический</MenuItem>
				</Select>
				<TextField
					defaultValue={singleTask && singleTask.date}
					disabled={!checked}
					autoFocus
					margin='dense'
					id='date'
					type='date'
					variant='standard'
					{...register('date')}
				/>
				<TextField
					defaultValue={singleTask && singleTask.tags}
					disabled={!checked}
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
		</DialogContent>
	);
};
