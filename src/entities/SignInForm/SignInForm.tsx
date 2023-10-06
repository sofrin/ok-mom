import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	TextField,
} from '@mui/material';

import { LoginSchema } from './modal/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const SignInForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginSchema>({
		resolver: zodResolver(LoginSchema),
		mode: 'onChange',
	});
	const onSubmit = async (values: LoginSchema) => {
		console.log(values);
		// const data = await dispatch(fetchAuth(values));
		// if ('token' in data) {
		// 	window.localStorage.setItem('token', data.payload.token);
		// }
	};
	// if (isAuth) {
	// 	return <Navigate to={'/Home'} />;
	// }
	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit)}
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
