import { Grid, Paper } from '@mui/material';
import { ChildVIewHistory } from '../widgets/ChildViewHistory/ChildVIewHistory';
import { useAuth } from 'shared/model/hooks';

export const ChildHistory = () => {
	const isAuth = useAuth();
	let username = '';
	if (isAuth.user?.role === 'child') {
		username = isAuth.user.name;
	}
	if (isAuth.user?.role === 'parent') {
		username = isAuth.user.children[0].name;
	}
	return (
		<Grid
			container
			sx={{ justifyContent: 'center', alignItems: 'center', height: '70vh' }}
		>
			<Grid
				item
				sx={{
					width: 'fit-content',
				}}
			>
				<Paper
					sx={{
						p: 3,
						display: 'flex',
						flexDirection: 'column',
						width: '1000px',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<ChildVIewHistory child={username} />
				</Paper>
			</Grid>
		</Grid>
	);
};
