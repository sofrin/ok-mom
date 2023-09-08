import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, Select } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const taskAddSchema = z.object({
  child: z.string().optional(),
  title: z.string().optional(),
  points: z.number().optional(),
  taskType: z.string().optional(),
  description: z.string().optional(),
  priority: z.string().optional(),
  date: z.string().optional(),
  tags: z.string().optional(),
});

type taskAddSchema = z.infer<typeof taskAddSchema>;

export default function AddTaskDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (data: taskAddSchema) => {
    console.log(data);

    const response = await fetch(
      'https://64f8d138824680fd21801557.mockapi.io/tasks',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        // Send your data in the request body as JSON
        body: JSON.stringify(data),
      },
    );
    if (response.ok) {
      alert('Form submited successfully');
      reset
      return;
    } else {
      alert('Form submition failed');
      return;
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<taskAddSchema>({ resolver: zodResolver(taskAddSchema) });
  return (
    <div >
      <Button
        variant='outlined'
        onClick={handleClickOpen}
      >
        Open form dialog
      </Button>

      <Dialog

        component='form'
        onSubmit={handleSubmit(onSubmit)}
        open={open}
        onClose={handleClose}
      // fullWidth
      >
        <DialogTitle>Добавить задание</DialogTitle>
        <DialogContent >
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
              defaultValue={'Ребёнок 1'}
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
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-around' }}>
          <Button
            disabled={isSubmitting}
            type="submit"
          // onClick={handleClose}
          >
            Готово
          </Button>
          <Button onClick={handleClose}>Отмена</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
