import { Grid, Paper, Typography } from '@mui/material';
import { selectBalance, selectGifts } from 'entities/Gifts/model/giftsSlice';
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
					<Grid
						container
						spacing={2}
						sx={{
							padding: '10px',
							height: '70vh',
							overflow: 'auto',
							width: '60vw',
							justifyContent: 'center',
						}}
					>
						<Grid
							item
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
						</Grid>
						<Grid
							item
							sx={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-evenly',
								width: '100%',
								flexWrap: 'wrap',
								gap: '20px',
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
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
};
