
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { ListItem, ListItemIcon, ListItemText, Link, Button } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { tasksResponse } from '../pages/Home';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';

type ChildTaskCardProps = {
  child: string,
  tasks: tasksResponse[],
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export const ChildTaskCard: React.FC<ChildTaskCardProps> = ({ child, tasks, setOpen }) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const filtteredTasks = tasks.filter((obj: tasksResponse) => Object.values(obj).includes(child))
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
  const points = filtteredTasks.reduce((a: number, obj: tasksResponse) => a + obj.points, 0)
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
                <Item >{child}</Item>
              </Grid>
              <Grid item xs={4} justifyContent='center' >
                <Typography>Прогресс выполнения задач</Typography>
                <Box sx={{ position: 'relative', display: 'inline-flex', ml: 7, bgcolor: 'lightgrey', borderRadius: 5 }}>
                  <CircularProgress variant="determinate" value={points * 0.1} />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.secondary"
                    >{`${Math.round(points * 0.1)}%`}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} >
              <Typography>Задачи на сегодня:</Typography>
            </Grid>
            <Grid item container direction="column" xs={12} sx={{ p: 4, height: 150, overflow: 'auto' }}>
              <List disablePadding>
                {filtteredTasks.map((obj: tasksResponse) =>
                  <RouterLink to={`/Home/${obj.id}`}>
                    <ListItem key={obj.id} disablePadding>
                      <ListItemIcon sx={{ p: 0, minWidth: 20 }}>
                        {priorityCircle(obj.priority)}
                      </ListItemIcon>

                      <ListItemText
                        primary={obj.title}
                      />
                    </ListItem>
                  </RouterLink>)}
              </List>
            </Grid>

            <Grid item xs={12} sx={{ p: 4 }}>
              <Link href="#">Смотреть расписание →</Link>
            </Grid>
            <Grid container item>
              <Grid item xs={5} sx={{ mr: 10 }}>
                <Button onClick={handleClickOpen} sx={{ px: 0 }}>Добавить задачу +</Button>
              </Grid>
              <Grid item xs={5}>
                <Item>Баллы:{points}</Item>
              </Grid>
            </Grid>
          </Grid>
        </Paper >
      </Grid ></>
  )
};
