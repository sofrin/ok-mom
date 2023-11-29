import { Grid, Paper } from '@mui/material';

import { SuggestForm } from 'widgets/SuggestForm/SuggestForm';

export const ChildSuggestions = () => {
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
					<SuggestForm />
				</Paper>
			</Grid>
		</Grid>
	);
};
