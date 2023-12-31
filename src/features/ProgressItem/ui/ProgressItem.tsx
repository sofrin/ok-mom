import {
	Box,
	CircularProgress,
	Grid,
	Skeleton,
	Typography,
} from '@mui/material';
import React from 'react';
import { progressValue } from '../model/ProgressAlg';
import { taskSchema } from 'shared/types';
import { selectGoal } from 'entities/Gifts/model/giftsSlice';
import { useAppSelector } from 'shared/model/hooks';

type Props = {
	filteredTasks: taskSchema[];
	points: number;
};

export const ProgresItem = ({ filteredTasks, points }: Props) => {
	const goal = useAppSelector(selectGoal);
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
						value={progressValue(filteredTasks, goal)}
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
					>{`${Math.round(progressValue(filteredTasks, goal))}%`}</Typography>
				</Box>
			</Box>
		</Grid>
	);
};
