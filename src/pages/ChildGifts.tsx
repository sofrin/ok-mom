import { Grid, Paper, Box, Typography } from '@mui/material';
import { selectBalance, selectGifts } from 'entities/Gifts/model/GiftsSlice';
import { ChildGiftItem } from 'entities/Gifts/ui/ChildGiftItem';
import { useAppSelector } from 'shared/model/hooks';

export const ChildGifts = () => {
	const gifts = useAppSelector(selectGifts);
	const balance = useAppSelector(selectBalance);

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
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							width: '100%',
							padding: '10px',
						}}
					>
						<Typography variant='h5'>Подарки</Typography>
						<Typography variant='h5'>Баланс: {balance} ₽ </Typography>
					</Box>

					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '100%',
							flexWrap: 'wrap',
							gap: '10px',
							marginTop: '10px',
						}}
					>
						{gifts.map((gift) => (
							<ChildGiftItem
								key={gift.id}
								id={gift.id}
								image={gift.image}
								title={gift.title}
								description={gift.description}
								price={gift.price}
							/>
						))}
					</Box>
				</Paper>
			</Grid>
		</Grid>
	);
};
