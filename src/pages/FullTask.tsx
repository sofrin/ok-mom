
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Select, MenuItem, FormControlLabel, Switch } from '@mui/material';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { tasksResponse } from './Home';
import { taskAddSchema } from '../Components/AddTaskDialog';



export const FullTask: React.FC = () => {

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<taskAddSchema>();
  let { id } = useParams();
  console.log(`id из useParams`, id);

  const navigate = useNavigate();
  const [singleTask, setSingleTask] = useState<tasksResponse>();
  const [checked, setChecked] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const location = useLocation()

  const tasks: tasksResponse[] = location.state.tasks
  console.log(tasks);

  if (id === 'undefined') {
    id = String(Number(tasks[tasks.length - 2].id) + 1)
    window.history.replaceState(null, "VT", `/Home/tasks/${id}`)
  }
  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await fetch(`https://64f8d138824680fd21801557.mockapi.io/tasks/` + id, {
          method: 'GET',
          headers: { 'content-type': 'application/json' },
        })
        const task = await response.json()
        // console.log(tasks);
        setSingleTask(task)
      } catch (error) {
        alert('Ошибка при получении задачи');
        navigate(-1);
      }
    }
    fetchTask()
  }, [id, navigate]);
  if (!singleTask) {
    return <div>Загрузка...</div>;
  }
  const handleClose = () => {
    navigate(-1);
  };
  const onSubmit = async (data: taskAddSchema) => {
    console.log(`данные из измененной формы`, data);

    const response = await fetch(
      `https://64f8d138824680fd21801557.mockapi.io/tasks/${id}`,
      {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        // Send your data in the request body as JSON
        body: JSON.stringify(data),
      },
    );
    if (response.ok) {
      alert('Form edited successfully');
      handleClose()
      return;
    } else {
      alert('Form edit failed');
      return;
    }
  };

  return (
    <Dialog
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      open
      onClose={handleClose}
    // fullWidth
    >
      <DialogTitle>Добавить задание</DialogTitle>
      <DialogContent sx={{ width: 600 }} >
        <FormControlLabel control={<Switch checked={checked}
          onChange={handleChange} />} label="edit" />
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
            defaultValue={singleTask.child}
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
            defaultValue={singleTask.title}
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
            defaultValue={singleTask.points}
            disabled={!checked}
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
            defaultValue={singleTask.taskType}
            disabled={!checked}
            id='taskType'
            label='Type'
            {...register('taskType')}
          >
            <MenuItem value={'Ежедневно'}>Ежедневно</MenuItem>
            <MenuItem value={'Единоразово'}>Единоразово</MenuItem>
          </Select>
          <TextField
            defaultValue={singleTask.description}
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
          <TextField

            disabled={!checked}
            autoFocus
            margin='dense'
            id='file'
            type='file'
            variant='outlined'
          />
          <DialogContentText>Приоритет задания:</DialogContentText>
          <Select
            defaultValue={singleTask.priority}
            disabled={!checked}
            id='priority'
            label='Приоритет'
            variant='outlined'
            {...register('priority')}
          >
            <MenuItem value={'Низкий'}>Низкий</MenuItem>
            <MenuItem value={'Средний'}>Средний</MenuItem>
            <MenuItem value={'Высокий'}>Высокий</MenuItem>
            <MenuItem value={'Критический'}>Критический</MenuItem>
          </Select>
          <TextField
            defaultValue={singleTask.date}
            disabled={!checked}
            autoFocus
            margin='dense'
            id='date'
            type='date'
            variant='standard'
            {...register('date')}
          />
          <TextField
            defaultValue={singleTask.tags}
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

      <DialogActions sx={{ justifyContent: 'space-around' }}>
        <Button
          disabled={isSubmitting}
          type="submit"

        >
          Готово
        </Button>
        <Button onClick={handleClose}>Вернуться</Button>
      </DialogActions>
    </Dialog>
  );
};
