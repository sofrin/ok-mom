import { Box, Button, TextField, Typography } from '@mui/material';
import { Gift } from 'entities/Gifts/model/types';
import { addSuggestion } from 'entities/Suggestions/model/suggestionSlice';
import { useSnackbar } from 'notistack';

import { useAppDispatch } from 'shared/model/hooks';
import { useForm } from 'react-hook-form';
import { SuggestionSchema } from 'shared/types';
import { zodResolver } from '@hookform/resolvers/zod';

export const SuggestForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SuggestionSchema>({
		resolver: zodResolver(SuggestionSchema),
	});
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useAppDispatch();

	const onSubmit = (data: Partial<Gift>) => {
		dispatch(addSuggestion(data));
		enqueueSnackbar('Подарок успешно отправлен', { variant: 'success' });
	};
	const onErrors = () => {
		console.log('errors', errors);
		enqueueSnackbar('Что-то пошло не так', { variant: 'error' });
	};
	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit, onErrors)}
			noValidate
			sx={{ mt: 1, width: '500px' }}
		>
			<Typography
				variant='h5'
				sx={{ textAlign: 'center' }}
			>
				Предложить подарок
				{errors.root?.message}
			</Typography>
			<TextField
				margin='normal'
				error={Boolean(errors.title)}
				helperText={errors.title?.message}
				required
				fullWidth
				id='title'
				label='Название'
				{...register('title', { required: true, minLength: 3 })}
			/>
			<TextField
				margin='normal'
				aria-multiline
				error={Boolean(errors.title)}
				helperText={errors.title?.message}
				required
				fullWidth
				id='description'
				label='Описание'
				{...register('description', { required: true, minLength: 3 })}
			/>
			<TextField
				type='number'
				margin='normal'
				error={Boolean(errors.title)}
				helperText={errors.title?.message}
				required
				fullWidth
				id='price'
				label='Цена'
				{...register('price', { valueAsNumber: true })}
			/>

			<Button
				type='submit'
				fullWidth
				variant='contained'
				sx={{ mt: 3, mb: 2 }}
			>
				Отправить
			</Button>
		</Box>
	);
};
