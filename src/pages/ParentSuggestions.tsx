import { Grid, Paper, Typography } from '@mui/material';
import { selectSuggestions } from 'entities/Suggestions/model/suggestionSlice';
import { ParentSuggestCard } from 'entities/Suggestions/ui/ParentSuggestCard/ParentSuggestCard';
import { useAppSelector } from 'shared/model/hooks';

export const ParentSuggestions = () => {
	const suggestions = useAppSelector(selectSuggestions);
	console.log(suggestions);

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
					<Typography variant='h5'> Предложения детей: </Typography>
					<Grid
						container
						spacing={2}
						sx={{
							padding: '10px',
						}}
					>
						{suggestions.map((suggestion) => (
							<Grid item>
								<ParentSuggestCard
									key={suggestion.id}
									id={suggestion.id}
									title={suggestion.title}
									price={suggestion.price}
									description={suggestion.description}
									image={suggestion.image}
								/>
							</Grid>
						))}
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
};
