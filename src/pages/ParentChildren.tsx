import { Grid, Paper } from '@mui/material';
import { selectBalance } from 'entities/Gifts/model/giftsSlice';
import { useAppSelector } from 'shared/model/hooks';

import { ChildrenCard } from 'entities/ChildrenCard';
export const ParentChildren = () => {
	const balance = useAppSelector(selectBalance);
	const children = ['Ребёнок 1', 'Ребёнок 2'];
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
								<ChildrenCard
									key={index}
									index={index}
									child={child}
									balance={balance}
								/>
							))}
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
};
