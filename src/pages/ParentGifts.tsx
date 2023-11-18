import { Grid, Paper, Tab, Tabs } from '@mui/material';
import {
	selectGifts,
	selectRedeemedGifts,
} from 'entities/Gifts/model/giftsSlice';
import { ParentGiftCard } from 'entities/Suggestions/ui/ParentCard';
import { SyntheticEvent, useState } from 'react';
import { useAppSelector } from 'shared/model/hooks';
import { CustomTabPanel } from 'shared/ui/CustomTabPanel';

export const ParentGifts = () => {
	const redeemedGifts = useAppSelector(selectRedeemedGifts);
	const gifts = useAppSelector(selectGifts);
	function a11yProps(index: number) {
		return {
			id: `simple-tab-${index}`,
		};
	}
	const [value, setValue] = useState(0);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
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
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						padding: '10px',
					}}
				>
					<Tabs
						value={value}
						onChange={handleChange}
					>
						<Tab
							label='Заказанные подарки'
							{...a11yProps(0)}
						/>
						<Tab
							label='Все подарки'
							{...a11yProps(1)}
						/>
					</Tabs>

					<Grid
						container
						spacing={2}
						sx={{
							padding: '10px',
							height: 'fit-content',
							overflow: 'auto',
							width: '60vw',
							justifyContent: 'center',
						}}
					>
						<CustomTabPanel
							value={value}
							index={0}
						>
							{/* {redeemedGifts && (
								<Typography variant='h5'> Заказанные подарки: </Typography>
							)} */}
							{redeemedGifts.map((gift) => (
								<Grid item>
									<ParentGiftCard
										key={gift.id}
										id={gift.id}
										title={gift.title}
										price={gift.price}
										description={gift.description}
										image={gift.image}
										redeemedGift
									/>
								</Grid>
							))}
						</CustomTabPanel>
						<CustomTabPanel
							value={value}
							index={1}
						>
							{/* {gifts && <Typography variant='h5'> Подарки: </Typography>} */}
							{gifts.map((gift) => (
								<Grid item>
									<ParentGiftCard
										key={gift.id}
										id={gift.id}
										title={gift.title}
										price={gift.price}
										description={gift.description}
										image={gift.image}
										gift
									/>
								</Grid>
							))}
						</CustomTabPanel>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
};
