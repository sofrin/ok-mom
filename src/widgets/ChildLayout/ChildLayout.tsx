import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { Navigate, Outlet } from 'react-router-dom';
import { AppBar } from 'shared/ui/AppBar/AppBar';
import { Drawer } from 'shared/ui/Drawer/Drawer';
import { ChildNavBar } from 'widgets/NavBar/NavBar';
import { logOut } from 'features/authentication/model/authSlice';
import Button from '@mui/material/Button';
import { useAppDispatch, useAuth } from 'shared/model/hooks';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export function ChildLayout() {
	const [open, setOpen] = React.useState(true);
	const toggleDrawer = () => {
		setOpen(!open);
	};
	const dispatch = useAppDispatch();
	const isAuth = useAuth();
	if (!isAuth.user) {
		return <Navigate to='/signIn' />;
	}
	return (
		<ThemeProvider theme={defaultTheme}>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar
					position='absolute'
					open={open}
				>
					<Toolbar
						sx={{
							pr: '24px', // keep right padding when drawer closed
						}}
					>
						<IconButton
							edge='start'
							color='inherit'
							aria-label='open drawer'
							onClick={toggleDrawer}
							sx={{
								marginRight: '36px',
								...(open && { display: 'none' }),
							}}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							component='h1'
							variant='h6'
							color='inherit'
							noWrap
							sx={{ flexGrow: 1 }}
						>
							Child home page
						</Typography>
						<Button
							variant='outlined'
							color='inherit'
							onClick={() => dispatch(logOut())}
						>
							Logout
						</Button>
						<IconButton color='inherit'>
							<Badge
								badgeContent={4}
								color='secondary'
							>
								<NotificationsIcon />
							</Badge>
						</IconButton>
					</Toolbar>
				</AppBar>
				<Drawer
					variant='permanent'
					open={open}
				>
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
					<List component='nav'>
						{ChildNavBar}
						<Divider sx={{ my: 1 }} />
					</List>
				</Drawer>
				<Box
					component='main'
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

					<Container
						maxWidth='lg'
						sx={{ mt: 4, mb: 4 }}
					>
						<Outlet />
					</Container>
				</Box>
			</Box>
		</ThemeProvider>
	);
}
