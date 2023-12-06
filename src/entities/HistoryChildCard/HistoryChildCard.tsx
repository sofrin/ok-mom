import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Chip,
	Collapse,
	Grid,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { taskSchema } from 'shared/types';

export const HistoryChildCard = ({
	title,
	description,
	points,
}: taskSchema) => {
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	return (
		<Card sx={{ width: '100%', borderRadius: '10px', marginBottom: '5px' }}>
			<Box
				sx={{
					height: '15px',
					width: '100%',
					backgroundColor: 'grey',
				}}
			></Box>

			<CardActionArea onClick={handleExpandClick}>
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
						label={points}
					/>
				</Grid>

				<CardMedia
					component='img'
					sx={{
						height: 100,
						objectFit: 'fill',
					}}
					image='https://source.unsplash.com/random'
					alt='img'
				/>
			</CardActionArea>
			<Collapse
				in={expanded}
				collapsedSize={50}
				timeout='auto'
			>
				<CardContent sx={{ width: '100%' }}>
					<Typography
						variant='body2'
						sx={{ fontSize: 20 }}
					>
						{description}
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};
