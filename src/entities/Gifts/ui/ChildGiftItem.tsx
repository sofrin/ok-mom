import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	CardActionArea,
} from '@mui/material';
import { Gift } from '../model/types';
import Chip from '@mui/material/Chip';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { useAppDispatch } from 'shared/model/hooks';
import { addRedeemedGift, decrementBalance } from '../model/giftsSlice';

export const ChildGiftItem = ({
	id,
	title,
	description,
	price,
	image,
}: Gift): JSX.Element => {
	const onClickBuy = () => {
		dispatch(addRedeemedGift({ id, title, description, price, image }));
		dispatch(decrementBalance(price));
	};
	const dispatch = useAppDispatch();
	return (
		<Card sx={{ width: 345, borderRadius: '10px', marginBottom: '5px' }}>
			<CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
				<Typography
					gutterBottom
					variant='h5'
				>
					{title}
				</Typography>
				<CardMedia
					sx={{ height: 140, mb: 2 }}
					image={image}
					title='gift'
				/>
				<Typography
					variant='body2'
					color='text.secondary'
					paragraph
				>
					{description}
				</Typography>
				<CardActionArea onClick={() => onClickBuy()}>
					<Chip
						icon={<CurrencyBitcoinIcon />}
						label={price}
						sx={{ bgcolor: 'info.main', width: '100%' }}
					/>
				</CardActionArea>
			</CardContent>
		</Card>
	);
};
