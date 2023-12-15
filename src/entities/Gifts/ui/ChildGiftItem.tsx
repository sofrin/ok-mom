import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from 'shared/model/hooks';
import { addRedeemedGift, selectRedeemedGifts } from '../model/giftsSlice';
import { Gift } from '../model/types';
import ImgUrl from '../../../assets/randompic.avif';
export const ChildGiftItem = ({
	id,
	title,
	description,
	price,
	image,
}: Gift): JSX.Element => {
	const reedeemedGifts = useAppSelector(selectRedeemedGifts);
	const { enqueueSnackbar } = useSnackbar();
	const onClickBuy = () => {
		if (reedeemedGifts.some((gift) => gift.id === id)) {
			return enqueueSnackbar('Такой подарок уже куплен', { variant: 'error' });
		}
		dispatch(addRedeemedGift({ id, title, description, price, image }));
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
					image={ImgUrl}
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
