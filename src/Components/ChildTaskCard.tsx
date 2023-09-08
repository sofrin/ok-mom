
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { ListItem, ListItemIcon, ListItemText, Link, Button } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { tasksResponse } from '../pages/Home';

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
type ChildTaskCardProps = { child: string, tasks: tasksResponse[] }
export const ChildTaskCard: React.FC<ChildTaskCardProps> = ({ child, tasks }) => {

  const filtteredTasks = tasks.filter((obj: tasksResponse) => Object.values(obj).includes(child))
  const priorityCircle = (obj: tasksResponse) => {
    switch (obj.priority) {
      case 'Низкий':
        return <CircleIcon fontSize={'small'} sx={{ fontSize: 10 }} />
        break;
      case 'Средний':
        return <CircleIcon color='secondary' fontSize={'small'} sx={{ fontSize: 10 }} />
        break;
      case 'Высокий':
        return <CircleIcon color='primary' fontSize={'small'} sx={{ fontSize: 10 }} />
        break;
      case 'Критический':
        return <CircleIcon color='error' fontSize={'small'} sx={{ fontSize: 10 }} />
        break;

      default:
        break;
    }
  }

  return (
    <>
      <Grid item xs={12} md={4} lg={6}>
        <Paper
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            height: 400,
          }}
        >
          <Grid container direction="row" spacing={1} sx={{
            height: 400,
          }}>
            <Grid container direction="row" item>
              <Grid item xs={5} sx={{ mr: 15 }}>
                <Item >{child}</Item>
              </Grid>
              <Grid item xs={4} >
                <Typography>Прогресс выполнения задач</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} >
              <Typography>Задачи на сегодня:</Typography>
            </Grid>
            <Grid item container direction="column" xs={12} sx={{ p: 4, height: 150, overflow: 'auto' }}>
              <List disablePadding>
                {filtteredTasks.map((obj: tasksResponse) => <ListItem key={obj.id} disablePadding>
                  <ListItemIcon sx={{ p: 0, minWidth: 20 }}>
                    {priorityCircle(obj)}
                  </ListItemIcon>
                  <ListItemText
                    primary={obj.description}
                  />
                </ListItem>)}
              </List>
            </Grid>

            <Grid item xs={12} sx={{ p: 4 }}>
              <Link href="#">Смотреть расписание →</Link>
            </Grid>
            <Grid container item>
              <Grid item xs={5} sx={{ mr: 10 }}>
                <Button sx={{ px: 0 }}>Добавить задачу +</Button>
              </Grid>
              <Grid item xs={5}>
                <Item>Баллы:{filtteredTasks.reduce((a: number, obj: tasksResponse) => a + obj.points, 0)}</Item>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid></>
  )
};
