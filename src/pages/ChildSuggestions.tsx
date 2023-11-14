import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { SuggestionSchema } from 'shared/types';

import { ChildSuggestForm } from '../widgets/ChildSuggestForm/ChildSuggestForm';

export const ChildSuggestions = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SuggestionSchema>({
		resolver: zodResolver(SuggestionSchema),
		mode: 'onChange',
	});

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
					<ChildSuggestForm
						handleSubmit={handleSubmit}
						errors={errors}
						register={register}
					/>
				</Paper>
			</Grid>
		</Grid>
	);
};
