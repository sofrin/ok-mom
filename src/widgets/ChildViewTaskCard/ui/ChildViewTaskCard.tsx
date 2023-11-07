import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

import { CardActionArea, TextField, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';

import Typography from '@mui/material/Typography';
import { updateTaskThunk } from 'entities/CardTask/model/taskSlice';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useAppDispatch } from 'shared/model/hooks';
import { taskSchema } from 'shared/types';
import { priorityColor } from '../model/priorityColor';

type Props = {
	task: taskSchema;
	title: string;
	description: string;
	date?: string;
	priority: string;
	points: number;
};
export const ChildViewTaskCard: React.FC<Props> = ({
	task,
	title,
	description,
	date,
	priority,
	points,
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useAppDispatch();
	const handleClickCompleted = async (
		obj: taskSchema,
		string: 'isCompleted' | 'isArchived',
		value: boolean,
	) => {
		console.log(obj);
		const chandedObj = { ...obj, [string]: String(value) };
		dispatch(updateTaskThunk(chandedObj))
			.unwrap()
			.then(() => enqueueSnackbar('Задание отправлено', { variant: 'success' }))
			.catch((error) => enqueueSnackbar(error, { variant: 'error' }));
	};
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	const color = priorityColor(priority);
	return (
		<>
			<Card sx={{ width: '100%', borderRadius: '10px', marginBottom: '5px' }}>
				<Box
					sx={{
						height: '15px',
						width: '100%',
						backgroundColor: color,
					}}
				></Box>

				<CardActionArea onClick={handleExpandClick}>
					<Grid
						container
						sx={{ padding: '10px' }}
						direction='row'
						justifyContent='space-between'
						alignItems='center'
					>
						<Typography variant='h5'>{title}</Typography>

						<Chip
							icon={<CurrencyBitcoinIcon />}
							label={points}
						/>
					</Grid>
				</CardActionArea>

				{/* <CardMedia
				component='img'
				height='194'
				image='/static/images/cards/paella.jpg'
				alt='Paella dish'
			/> */}

				<Collapse
					in={expanded}
					collapsedSize={40}
					timeout='auto'
				>
					<CardContent sx={{}}>
						<Typography>{description}</Typography>

						<TextField
							variant='filled'
							placeholder='Написить комментарий...'
							size='small'
							sx={{ width: '100%' }}
						></TextField>
					</CardContent>
				</Collapse>
				<CardActions sx={{ justifyContent: 'space-between' }}>
					<Button
						variant='outlined'
						onClick={() => {
							handleClickCompleted(task, 'isCompleted', true);
						}}
						size='small'
						color='primary'
					>
						Completed
					</Button>
					<Typography>{date}</Typography>
				</CardActions>
			</Card>
		</>
	);
};
