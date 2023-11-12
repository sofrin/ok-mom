import { Box, Button, TextField, Typography } from '@mui/material';
import { addGift } from 'entities/Gifts/model/GiftsSlice';
import { Gift } from 'entities/Gifts/model/types';
import { useCallback } from 'react';
import {
	FieldErrors,
	UseFormHandleSubmit,
	UseFormRegister,
} from 'react-hook-form';
import { useAppDispatch } from 'shared/model/hooks';

type Props = {
	handleSubmit: UseFormHandleSubmit<
		{
			title: string;
			description: string;
			price: number;
		},
		undefined
	>;
	errors: FieldErrors<{
		title: string;
		description: string;
		price: number;
	}>;
	register: UseFormRegister<{
		title: string;
		description: string;
		price: number;
	}>;
};

export const ChildSuggestForm = ({ handleSubmit, errors, register }: Props) => {
	const dispatch = useAppDispatch();
	const onSubmitHandler = useCallback(
		({ title, description, price }: Partial<Gift>) => {
			dispatch(
				addGift({
					title,
					description,
					price,
				}),
			);
		},
		[dispatch],
	);
	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmitHandler)}
			noValidate
			sx={{ mt: 1, width: '500px' }}
		>
			<Typography
				variant='h5'
				sx={{ textAlign: 'center' }}
			>
				Предложить подарок
			</Typography>
			<TextField
				margin='normal'
				error={Boolean(errors.title)}
				helperText={errors.title?.message}
				required
				fullWidth
				id='title'
				label='Название'
				{...register('title', { required: 'Поле обязательно' })}
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
				{...register('description', { required: 'Поле обязательно' })}
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
				{...register('price', { required: 'Поле обязательно' })}
			/>
			<input type='file' />
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
