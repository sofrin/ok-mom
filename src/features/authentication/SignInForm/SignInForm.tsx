import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	TextField,
} from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginSchema } from 'shared/types';
import { useCallback } from 'react';
import { loginThunk } from '../model/authSlice';
import { useAppDispatch } from 'shared/model/hooks';

export const SignInForm = () => {
	const dispatch = useAppDispatch();
	const {
		setError,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginSchema>({
		resolver: zodResolver(LoginSchema),
		mode: 'onChange',
	});
	const onSubmitHandler = useCallback(
		({ email, password }: LoginSchema) => {
			dispatch(loginThunk({ email, password }))
				.unwrap()
				.catch((error) => {
					setError('email', { type: 'server', message: error.message });
				});
		},
		[setError, dispatch],
	);
	// if (isAuth) {
	// 	return <Navigate to={'/Home'} />;
	// }
	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmitHandler)}
			noValidate
			sx={{ mt: 1 }}
		>
			<TextField
				margin='normal'
				error={Boolean(errors.email)}
				helperText={errors.email?.message}
				required
				fullWidth
				id='email'
				label='Email Address'
				autoComplete='email'
				autoFocus
				{...register('email', { required: 'Поле обязательно' })}
			/>
			<TextField
				margin='normal'
				required
				fullWidth
				label='Password'
				type='password'
				id='password'
				helperText={errors.password?.message}
				autoComplete='current-password'
				{...register('password', { required: 'Поле обязательно' })}
			/>
			<FormControlLabel
				control={
					<Checkbox
						value='remember'
						color='primary'
					/>
				}
				label='Remember me'
			/>
			<Button
				type='submit'
				fullWidth
				variant='contained'
				sx={{ mt: 3, mb: 2 }}
			>
				Sign In
			</Button>
		</Box>
	);
};
