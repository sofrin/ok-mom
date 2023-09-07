import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems } from '../Components/ListItems';
import { Button, Link, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import AddIcon from '@mui/icons-material/Add';


const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export default function Home() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Parent home page
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={6}>
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400,
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={5} sx={{ mr: 15 }}>
                      <Item >Ребенок 1</Item>
                    </Grid>
                    <Grid item xs={4} className='w-1/4'>
                      <Typography>Прогресс выполнения задач</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ mr: 15 }}>
                      <Typography>Задачи на сегодня:</Typography>
                    </Grid>
                    <Grid item xs={8} sx={{ p: 4 }}>
                      <List disablePadding>
                        <ListItem disablePadding>
                          <ListItemIcon sx={{ p: 0, minWidth: 20 }}>
                            <CircleIcon fontSize={'small'} sx={{ fontSize: 10 }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="описание задачи 1"
                          />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon sx={{ p: 0, minWidth: 20 }}>
                            <CircleIcon fontSize={'small'} sx={{ fontSize: 10 }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="описание задачи 2"
                          />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon sx={{ p: 0, minWidth: 20 }}>
                            <CircleIcon fontSize={'small'} sx={{ fontSize: 10 }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="описание задачи 3"
                          />
                        </ListItem>
                      </List>
                    </Grid>

                    <Grid item xs={8} sx={{ p: 4 }}>
                      <Link href="#">Смотреть расписание →</Link>
                    </Grid>
                    <Grid item xs={5} sx={{ mr: 10 }}>
                      <Button>Добавить задачу +</Button>
                    </Grid>
                    <Grid item xs={5}>
                      <Item>10 Баллов</Item>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={6}>
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400,
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={5} sx={{ mr: 15 }}>
                      <Item >Ребенок 2</Item>
                    </Grid>
                    <Grid item xs={4} className='w-1/4'>
                      <Typography>Прогресс выполнения задач</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ mr: 15 }}>
                      <Typography>Задачи на сегодня:</Typography>
                    </Grid>
                    <Grid item xs={8} sx={{ p: 4 }}>
                      <List disablePadding>
                        <ListItem disablePadding>
                          <ListItemIcon sx={{ p: 0, minWidth: 20 }}>
                            <CircleIcon fontSize={'small'} sx={{ fontSize: 10 }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="описание задачи 1"
                          />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon sx={{ p: 0, minWidth: 20 }}>
                            <CircleIcon fontSize={'small'} sx={{ fontSize: 10 }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="описание задачи 2"
                          />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon sx={{ p: 0, minWidth: 20 }}>
                            <CircleIcon fontSize={'small'} sx={{ fontSize: 10 }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="описание задачи 3"
                          />
                        </ListItem>
                      </List>
                    </Grid>

                    <Grid item xs={8} sx={{ p: 4 }}>
                      <Link href="#">Смотреть расписание →</Link>
                    </Grid>
                    <Grid item xs={5} sx={{ mr: 10 }}>
                      <Button>Добавить задачу +</Button>
                    </Grid>
                    <Grid item xs={5}>
                      <Item>22 Баллов</Item>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>


              <Grid item xs={12} lg={6}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 70 }}>
                  <Button><AddIcon /></Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box >
    </ThemeProvider >
  );
}
