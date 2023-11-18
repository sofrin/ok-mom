import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import CardActions from '@mui/material/CardActions';
import { Button } from '@mui/material';
import {
	Card,
	CardContent,
	CardMedia,
	Chip,
	Grid,
	Typography,
} from '@mui/material';
import { useAppDispatch } from 'shared/model/hooks';
import { addGift, removeRedeemedGift } from 'entities/Gifts/model/giftsSlice';
import { removeSuggestion } from 'entities/Suggestions/model/suggestionSlice';
type Props = {
	id: string;
	title: string;
	price: number;
	description: string;
	image?: string;
	redeemedGift?: boolean;
	gift?: boolean;
};

export const ParentGiftCard = ({
	title,
	price,
	description,
	id,
	image,
	redeemedGift,
	gift,
}: Props) => {
	const onClickSuccess = () => {
		if (redeemedGift) {
			dispatch(removeRedeemedGift(id));
		} else {
			dispatch(addGift(id));
		}
	};
	const onClickCancel = () => {
		if (redeemedGift) {
			dispatch(removeRedeemedGift(id));
		} else {
			dispatch(removeSuggestion(id));
		}
	};
	const dispatch = useAppDispatch();
	return (
		<Card sx={{ width: '400px', borderRadius: '10px', marginBottom: '5px' }}>
			<Grid
				container
				sx={{ padding: '10px' }}
				direction='row'
				justifyContent='space-between'
				alignItems='center'
			>
				<Typography
					variant='h5'
					sx={{ fontWeight: 'bold', maxWidth: '260px' }}
				>
					{title}
				</Typography>

				<Chip
					icon={<CurrencyBitcoinIcon />}
					label={price}
				/>
			</Grid>

			<CardMedia
				component='img'
				sx={{
					height: 100,
					objectFit: 'fill',
				}}
				image={image ? image : 'https://source.unsplash.com/random'}
				alt='img'
			/>
			<CardContent sx={{ width: '100%' }}>
				<Typography
					variant='body2'
					sx={{ fontSize: 20 }}
				>
					{description}
				</Typography>
				<CardActions
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						padding: '10px 0px 0px 0px',
					}}
				>
					<Button
						variant='contained'
						color='success'
						onClick={() => onClickSuccess()}
					>
						{redeemedGift ? 'Выполнено' : gift ? 'Редактировать' : 'Принять'}
					</Button>
					<Button
						variant='contained'
						color='error'
						onClick={() => onClickCancel()}
					>
						{redeemedGift ? 'Отменить' : gift ? 'Удалить' : 'Отклонить'}
					</Button>
				</CardActions>
			</CardContent>
		</Card>
	);
};
