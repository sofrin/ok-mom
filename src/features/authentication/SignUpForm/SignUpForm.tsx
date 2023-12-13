import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
} from '@mui/material';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { registerSchema } from 'shared/types';
import { registerThunk } from 'features/authentication/model/authSlice';
import { useAppDispatch } from 'shared/model/hooks';

export const SignUpForm = () => {
	const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<registerSchema>({ resolver: zodResolver(registerSchema) });
	const navigate = useNavigate();
	const onSubmitHandler = useCallback(
		({ email, password, login, confirmPassword }: registerSchema) => {
			dispatch(
				registerThunk({
					email,
					password,
					login,
					confirmPassword,
				}),
			)
				.unwrap()
				.then(() => {
					navigate('/Home/tasks');
				})
				.catch((error) => {
					console.log(error);
				});
		},
		[dispatch, navigate],
	);

	return (
		<Box
			component='form'
			noValidate
			onSubmit={handleSubmit(onSubmitHandler)}
			sx={{ mt: 3 }}
		>
			<Grid
				container
				spacing={2}
			>
				<Grid
					item
					xs={12}
				>
					<TextField
						{...register('login', {
							required: 'login is required',
						})}
						autoComplete='login'
						name='login'
						fullWidth
						id='login'
						label='Login'
						autoFocus
					/>
				</Grid>
				<Grid
					item
					xs={12}
				>
					<TextField
						{...register('email', {
							required: 'email is required',
						})}
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
					/>
				</Grid>
				<Grid
					item
					xs={12}
				>
					<TextField
						{...register('password', {
							required: 'passwrd is required',
						})}
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='new-password'
					/>
				</Grid>
				<Grid
					item
					xs={12}
				>
					<TextField
						{...register('confirmPassword', {
							required: 'password is required',
						})}
						fullWidth
						name='confirmPassword'
						label='Confirm password'
						type='password'
						id='confirmPassword'
					/>
					{errors.email && (
						<p className='text-red-500'> {`${errors.email.message}`}</p>
					)}
					{errors.password && (
						<p className='text-red-500'> {`${errors.password.message}`}</p>
					)}
					{errors.confirmPassword && (
						<p className='text-red-500'>
							{' '}
							{`${errors.confirmPassword.message}`}
						</p>
					)}
				</Grid>

				<Grid
					item
					xs={12}
				>
					<FormControlLabel
						control={
							<Checkbox
								value='allowExtraEmails'
								color='primary'
							/>
						}
						label='I want to receive inspiration, marketing promotions and updates via email.'
					/>
				</Grid>
			</Grid>

			<Button
				disabled={isSubmitting}
				type='submit'
				fullWidth
				variant='contained'
				sx={{ mt: 3, mb: 2 }}
			>
				Sign Up
			</Button>
		</Box>
	);
};
