import DoneIcon from '@mui/icons-material/Done';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	Chip,
	Grid,
	IconButton,
	TextField,
	Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { setBalance, setGoal } from 'entities/Gifts/model/giftsSlice';
import { useState } from 'react';
import { useAppDispatch } from 'shared/model/hooks';

type Props = {
	index: number;
	childName: string;
	balance: number;
	goal: number;
};
export const ChildrenCard = ({ childName, balance, goal }: Props) => {
	const dispatch = useAppDispatch();
	const [clicked, setClicked] = useState(false);
	const handleClick = () => {
		setClicked(!clicked);
	};
	return (
		<>
			<Grid item>
				<Card sx={{ maxWidth: 345 }}>
					<CardHeader
						titleTypographyProps={{
							variant: 'h5',
						}}
						avatar={
							<Avatar
								sx={{ bgcolor: red[500] }}
								aria-label='recipe'
							>
								{childName.split('')[0]}
							</Avatar>
						}
						action={
							<IconButton aria-label='settings'>
								<MoreVertIcon />
							</IconButton>
						}
						title={childName}
						subheader=''
					/>
					<CardContent>
						{clicked && (
							<>
								<TextField
									size='small'
									variant='outlined'
									type='number'
									label='Баланс'
									value={balance}
									InputLabelProps={{
										shrink: true,
									}}
									sx={{ width: '100px', marginRight: '15px' }}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										dispatch(setBalance(Number(e.target.value)));
									}}
								></TextField>
								<IconButton
									size='small'
									sx={[
										{
											'&:hover': {
												color: 'white',
												background: 'green',
											},
										},
									]}
									onClick={handleClick}
								>
									<DoneIcon />
								</IconButton>
							</>
						)}
						{!clicked && (
							<Chip
								clickable
								onClick={() => handleClick()}
								label={`Баланс: ${balance}`}
							/>
						)}
						<TextField
							size='small'
							variant='outlined'
							type='number'
							label='Цель'
							value={goal}
							InputLabelProps={{
								shrink: true,
							}}
							sx={{ width: '100px', marginLeft: '100px' }}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								dispatch(setGoal(Number(e.target.value)));
							}}
						></TextField>

						<Typography
							paragraph
							color='text.secondary'
							variant='body1'
							sx={{ marginTop: '10px' }}
						>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, quos!
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</>
	);
};
