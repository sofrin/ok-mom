import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	TextField,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SignInForm = () => {
	const navigate = useNavigate();
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get('email'),
			password: data.get('password'),
		});
		navigate('/Home/tasks');
	};
	return (
		<Box
			component='form'
			onSubmit={handleSubmit}
			noValidate
			sx={{ mt: 1 }}
		>
			<TextField
				margin='normal'
				required
				fullWidth
				id='email'
				label='Email Address'
				name='email'
				autoComplete='email'
				autoFocus
			/>
			<TextField
				margin='normal'
				required
				fullWidth
				name='password'
				label='Password'
				type='password'
				id='password'
				autoComplete='current-password'
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
