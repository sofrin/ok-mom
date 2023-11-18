import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Chip, Grid, Paper, Typography } from '@mui/material';

import { taskSchema } from 'shared/types';
import { ChildViewTaskCard } from 'widgets/ChildViewTaskCard/ui/ChildViewTaskCard';
import List from '@mui/material/List';
import { ListItem } from '@mui/material';
type Props = {
	tasksList: taskSchema[];
	colTitle: string;
};
export const ChildViewTasksCol = ({ tasksList, colTitle }: Props) => {
	const [parent] = useAutoAnimate();
	return (
		<>
			<Grid
				item
				xs={6}
				md={4}
				lg={4}
			>
				<Grid
					container
					justifyContent={'flex-start'}
					alignItems={'center'}
					gap={1}
				>
					<Typography variant='h5'>{colTitle}</Typography>
					<Chip
						label={tasksList.length}
						size='small'
						color='error'
					/>
				</Grid>
				<>
					<Grid
						item
						xs={12}
						md={12}
						lg={12}
					>
						<Paper
							sx={{
								display: 'flex',
								flexDirection: 'column',
								height: 700,
								padding: 2,
								overflowY: 'auto',
								overflowX: 'hidden',
							}}
						>
							<Grid
								container
								direction='row'
								spacing={1}
								sx={{
									maxHeight: 700,
									alignItems: 'flex-start',
									marginLeft: '-4px',
								}}
							>
								<List
									sx={{ width: '100%' }}
									ref={parent}
									disablePadding
								>
									{tasksList
										? tasksList.map((task) => (
												<ListItem
													key={task.id}
													disablePadding
												>
													<ChildViewTaskCard
														task={task}
														title={task.title}
														description={task.description}
														points={task.points}
														date={task.date}
														key={task.id}
														priority={task.priority}
													/>
												</ListItem>

												// eslint-disable-next-line no-mixed-spaces-and-tabs
										  ))
										: null}
								</List>
							</Grid>
						</Paper>
					</Grid>
				</>
			</Grid>
		</>
	);
};
