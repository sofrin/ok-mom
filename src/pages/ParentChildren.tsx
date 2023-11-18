import {
	Card,
	CardHeader,
	Grid,
	Paper,
	Avatar,
	IconButton,
	Chip,
	TextField,
} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { selectBalance, setBalance } from 'entities/Gifts/model/giftsSlice';
import { useAppDispatch, useAppSelector } from 'shared/model/hooks';
import { Typography } from '@mui/material';
import { useState } from 'react';

import DoneIcon from '@mui/icons-material/Done';
export const ParentChildren = () => {
	const balance = useAppSelector(selectBalance);
	const dispatch = useAppDispatch();
	const children = ['Ребёнок 1', 'Ребёнок 2'];
	const [clicked, setClicked] = useState(false);
	const handleClick = () => {
		setClicked(!clicked);
	};

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
					<Grid
						container
						spacing={2}
						justifyContent='center'
						alignItems={'center'}
						direction={'row'}
					>
						{children &&
							children.map((child, index) => (
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
													{index + 1}
												</Avatar>
											}
											action={
												<IconButton aria-label='settings'>
													<MoreVertIcon />
												</IconButton>
											}
											title={child}
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
														onChange={(e) => {
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

											<Typography
												color='text.secondary'
												variant='body1'
											>
												Lorem ipsum dolor sit amet consectetur adipisicing elit.
												Ea, quos!
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							))}
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
};
