import { Grid, Paper } from '@mui/material';
import { ChildVIewHistory } from '../widgets/ChildViewHistory/ChildVIewHistory';

export const ChildHistory = () => {
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
						width: 'fit-content',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<ChildVIewHistory child='Ребёнок 1' />
				</Paper>
			</Grid>
		</Grid>
	);
};
