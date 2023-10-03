import { Grid, Paper } from '@mui/material';
import React from 'react';

export const NotFound = () => {
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
					}}
				>
					<h1>
						<span>😔 </span>
						<br />
						Ничего не найдено
					</h1>
					<p>К сожалению данная страница отсуствует.</p>
				</Paper>
			</Grid>
		</Grid>
	);
};
