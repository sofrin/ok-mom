
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { tasksResponse } from '../pages/Home';
import { Link as RouterLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Item } from './ChildTaskCard';
import UndoIcon from '@mui/icons-material/Undo';

type CompletedTaskCardProps = {
  tasks: tasksResponse[],
  setTasks: React.Dispatch<React.SetStateAction<tasksResponse[]>>

}



export const CompletedTaskCard: React.FC<CompletedTaskCardProps> = ({ tasks, setTasks }) => {
  const handleClickUndo = async (obj: tasksResponse) => {
    console.log(obj);
    const unCompletedObj = { ...obj, completed: 'false' }
    setTasks((prev: tasksResponse[]) => prev.filter((task) => task.id !== obj.id))
    setTasks((prev) => [...prev, unCompletedObj])

    const response = await fetch(
      'https://64f8d138824680fd21801557.mockapi.io/tasks/' + obj.id,
      {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        // Send your data in the request body as JSON
        body: JSON.stringify({ completed: 'false' })
      },
    );
    if (response.ok) {
      alert('Task Uncompleted successfully');
      return;
    } else {
      alert('failed');
      return;
    }
  };
  const filteredTasks = tasks.filter((obj: tasksResponse) => Object.values(obj).includes('true'))
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
  if (!tasks) {
    return <div>Загрузка...</div>
  }
  return (
    <>
      <Grid item xs={12} md={4} lg={6}>
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
                <Item >  <Typography variant='body1' component="h3">Выполненые задания</Typography></Item>
              </Grid>

            </Grid>

            <Grid item container direction="column" xs={12} sx={{ p: 4, height: 300, overflowY: 'auto', overflowX: 'hidden' }}>
              <List disablePadding>
                {filteredTasks.map((obj: tasksResponse) =>

                  <ListItem key={obj.id} disablePadding sx={{ width: 510 }} >
                    <ListItemButton  >
                      <RouterLink className='flex items-center flex-1' key={obj.title} to={`/Home/${obj.id}`} state={{ tasks: tasks }} >
                        <ListItemIcon sx={{ p: 0, minWidth: 20 }}>
                          {priorityCircle(obj.priority)}
                        </ListItemIcon>

                        <ListItemText
                          primary={obj.title}
                        />
                      </RouterLink>
                      <ListItemButton onClick={() => handleClickUndo(obj)} sx={{ maxWidth: 25, paddingRight: 4 }} ><UndoIcon sx={[
                        {
                          '&:hover': {
                            color: 'white',
                            background: 'green'
                          },
                        },
                        { 'marginRight': 1 }
                      ]} /></ListItemButton>

                      <DeleteIcon sx={[
                        {
                          '&:hover': {
                            color: 'red',
                          },
                        },
                      ]} />
                    </ListItemButton>
                  </ListItem>
                )}
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
