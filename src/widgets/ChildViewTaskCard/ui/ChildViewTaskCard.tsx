import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardActionArea, Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
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
			<Card sx={{ width: '100%', borderRadius: '10px' }}>
				<Box
					sx={{
						height: '15px',
						width: '100%',
						backgroundColor: color,
					}}
				></Box>
				<CardHeader
					sx={{ padding: '10px' }}
					action={
						<IconButton aria-label='settings'>
							<MoreVertIcon />
						</IconButton>
					}
					title={title}
				/>
				{/* <CardMedia
				component='img'
				height='194'
				image='/static/images/cards/paella.jpg'
				alt='Paella dish'
			/> */}
				<CardActionArea onClick={handleExpandClick}>
					<CardContent sx={{ padding: '10px' }}>
						<Grid
							container
							sx={{
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Typography
								sx={{ maxWidth: '200px' }}
								variant='h6'
								color='text.secondary'
								noWrap
							>
								This is a task description
							</Typography>
							<Chip
								icon={<CurrencyBitcoinIcon />}
								label={points}
							/>
						</Grid>
					</CardContent>
				</CardActionArea>
				<Collapse
					in={expanded}
					timeout='auto'
					unmountOnExit
				>
					<CardContent sx={{}}>
						<Typography paragraph>Full description of a task:</Typography>
						<Typography paragraph>{description}</Typography>

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
