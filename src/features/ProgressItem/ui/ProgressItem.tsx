import {
	Box,
	CircularProgress,
	Grid,
	Skeleton,
	Typography,
} from '@mui/material';
import React from 'react';
import { progressValue } from '../modal/ProgressAlg';
import { taskSchema } from 'src/shared/types';

type Props = {
	filteredTasks: taskSchema[];
	points: number;
};

export const ProgresItem = ({ filteredTasks, points }: Props) => {
	return (
		<Grid
			item
			container
			xs={4}
			md={4}
			display='flex'
			direction='column'
			justifyContent='center'
		>
			<Typography>Прогресс выполнения задач</Typography>
			<Box
				sx={{
					position: 'relative',
					display: 'inline-flex',
					ml: 7,
					bgcolor: 'lightgrey',
					borderRadius: 5,
					marginLeft: 'auto',
					marginRight: 'auto',
				}}
			>
				{points ? (
					<CircularProgress
						variant='determinate'
						value={progressValue(filteredTasks)}
					/>
				) : (
					<Skeleton
						variant='circular'
						width={40}
						height={40}
					/>
				)}
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
						variant='caption'
						component='div'
						color='text.secondary'
					>{`${Math.round(progressValue(filteredTasks))}%`}</Typography>
				</Box>
			</Box>
		</Grid>
	);
};
