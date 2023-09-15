
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { ListItem, ListItemIcon, ListItemText, ListItemButton, Skeleton } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { tasksResponse } from '../pages/Home';
import { Link as RouterLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Item } from './ChildTaskCard';
import UndoIcon from '@mui/icons-material/Undo';
import { DragEvent } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

type ArchivedTasksCardProps = {
  tasks: tasksResponse[],
  setTasks: React.Dispatch<React.SetStateAction<tasksResponse[]>>
  isLoading: boolean,
  setDraggableTask: React.Dispatch<React.SetStateAction<tasksResponse | undefined>>
  draggableTask: tasksResponse | undefined
}



export const ArchivedTasksCard: React.FC<ArchivedTasksCardProps> = ({ tasks, setTasks, isLoading, setDraggableTask, draggableTask }) => {
  const handleClickDelete = async (obj: tasksResponse) => {
    console.log(obj);
    setTasks((prev: tasksResponse[]) => prev.filter((task) => task.id !== obj.id))

    const response = await fetch(
      'https://64f8d138824680fd21801557.mockapi.io/tasks/' + obj.id,
      {
        method: 'DELETE',
      },
    );
    if (response.ok) {
      alert('Task deleted successfully');
      return;
    } else {
      alert('failed');
      return;
    }
  };

  const handleClickUndo = async (obj: tasksResponse) => {
    console.log(obj);
    const unCompletedObj = { ...obj, isArchived: 'false' }
    setTasks((prev: tasksResponse[]) => prev.filter((task) => task.id !== obj.id))
    setTasks((prev) => [...prev, unCompletedObj])

    const response = await fetch(
      'https://64f8d138824680fd21801557.mockapi.io/tasks/' + obj.id,
      {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        // Send your data in the request body as JSON
        body: JSON.stringify({ isArchived: 'false' })
      },
    );
    if (response.ok) {
      alert('Task UnArchived successfully');
      return;
    } else {
      alert('failed');
      return;
    }
  };
  const filteredTasks = tasks.filter((obj: tasksResponse) => obj.isArchived === 'true')
  const priorityCircle = (priority: string) => {
    switch (priority) {
      case 'Низкий':
        return <CircleIcon fontSize={'small'} sx={{ fontSize: 10 }} />
      case 'Средний':
        return <CircleIcon color='secondary' fontSize={'small'} sx={{ fontSize: 10 }} />
      case 'Высокий':
        return <CircleIcon color='primary' fontSize={'small'} sx={{ fontSize: 10 }} />
      case 'Критический':
        return <CircleIcon color='error' fontSize={'small'} sx={{ fontSize: 10 }} />

      default:
        break;
    }
  }
  const points = filteredTasks.reduce((a: number, obj: tasksResponse) => a + obj.points, 0)
  function dragOverHandler(e: DragEvent) {
    e.preventDefault()
  }


  function dragStartHandler(e: DragEvent, obj: tasksResponse) {
    console.log(`dragStartHandler`, obj);
    setDraggableTask(obj)
    console.log(`DraggableTask`, draggableTask);
    // obj.child = ''
    // obj.isArchived = 'false'
    // obj.isCompleted = 'false'
    // setTasks((prev) => prev.filter((task) => task.id !== obj.id))

    console.log(`dragStartHandler`, obj);
  }



  function dropHandler(e: DragEvent): void {
    e.preventDefault()
    console.log(`dropHandler`, filteredTasks);
    console.log(`draggableTask`, draggableTask);
    if (draggableTask) {
      draggableTask.isArchived = 'true'
      // draggableTask.isCompleted = 'true'
      fetch(
        'https://64f8d138824680fd21801557.mockapi.io/tasks/' + draggableTask.id,
        {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          // Send your data in the request body as JSON
          body: JSON.stringify({ isArchived: 'true' })
        },
      );
      setTasks((prev: tasksResponse[]) => prev.filter((task) => task.id !== draggableTask.id))
      setTasks((prev) => [...prev, draggableTask])
      setDraggableTask(undefined)
      console.log(`dropHandler`, filteredTasks);
    }

  }
  const [parent] = useAutoAnimate()

  if (!tasks) {
    return <div>Загрузка...</div>
  }
  return (
    <>
      <Grid onDrop={(e) => dropHandler(e)} onDragOver={(e) => { dragOverHandler(e) }} item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            height: 450,
          }}
        >
          <Grid container direction="row" spacing={1} sx={{
            height: 450,
          }}>
            <Grid container direction="row" item>
              <Grid item xs={5} sx={{ mr: 15 }}>
                <Item >  <Typography variant='body1' component="h3">Задания в архиве</Typography></Item>
              </Grid>

            </Grid>

            <Grid item container direction="column" xs={12} sx={{ p: 4, height: 300, overflowY: 'auto', overflowX: 'hidden' }}>
              <List ref={parent} disablePadding>
                {!isLoading ? filteredTasks.map((obj: tasksResponse) =>

                  <ListItem draggable
                    onDragOver={(e) => { dragOverHandler(e) }}
                    onDragStart={(e) => { dragStartHandler(e, obj) }}
                    onDrop={(e) => dropHandler(e)} key={obj.id} disablePadding sx={{ width: 510, opacity: 0.5 }} >
                    <ListItemButton  >
                      <RouterLink className='flex items-center flex-1' key={obj.title} to={`/Home/tasks/${obj.id}`} state={{ tasks: tasks }} >
                        <ListItemIcon sx={{ p: 0, minWidth: 20 }}>
                          {priorityCircle(obj.priority)}
                        </ListItemIcon>

                        <ListItemText
                          primary={obj.title}
                        />
                      </RouterLink>
                      <ListItemButton onClick={() => handleClickUndo(obj)} sx={{ maxWidth: 25, padding: 0 }} ><UndoIcon sx={[
                        {
                          '&:hover': {
                            color: 'white',
                            background: 'green'
                          },
                        },
                        { 'marginRight': 1 }
                      ]} /></ListItemButton>

                      <ListItemButton onClick={() => handleClickDelete(obj)} sx={{ maxWidth: 24, padding: 0 }} >
                        <DeleteIcon sx={[
                          {
                            '&:hover': {
                              color: 'red',
                            },
                          },
                        ]} />
                      </ListItemButton>
                    </ListItemButton>
                  </ListItem>
                ) : <Skeleton variant="rounded" width={510} height={144} />}
              </List>
            </Grid>
            <Grid item xs={5}>
              <Item>Полученные баллы:{points}</Item>
            </Grid>
          </Grid>
        </Paper >
      </Grid ></>
  )
};
