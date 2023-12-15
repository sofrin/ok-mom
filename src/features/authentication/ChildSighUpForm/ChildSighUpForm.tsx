import { Box, Button, DialogTitle, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navigate } from 'react-router-dom';
import { registerChildSchema } from 'shared/types';
import {
	childRegisterThunk,
	setCredentials,
	updateParentUserThunk,
} from 'features/authentication/model/authSlice';
import { useAppDispatch, useAuth } from 'shared/model/hooks';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useSnackbar } from 'notistack';
type Props = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ChildSignUpForm = ({ open, setOpen }: Props) => {
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<registerChildSchema>({
		resolver: zodResolver(registerChildSchema),
	});
	const isAuth = useAuth();

	if (!isAuth.user || isAuth.user.role !== 'parent') {
		return <Navigate to='/signIn' />;
	}
	const parent_id = isAuth.user.id;
	const onSubmitHandler = ({
		email,
		password,
		login,
		confirmPassword,
		name,
	}: registerChildSchema) => {
		dispatch(
			childRegisterThunk({
				id: undefined,
				role: 'child',
				balance: 0,
				goal: 100,
				parent_id,
				name,
				email,
				password,
				login,
				confirmPassword,
			}),
		)
			.unwrap()
			.then(async () => {
				enqueueSnackbar('Регистрация прошла успешно', {
					variant: 'success',
				});
				if (isAuth.user && isAuth.user.role === 'parent') {
					await dispatch(
						updateParentUserThunk({
							id: parent_id,
							children: [
								...isAuth.user.children,
								{
									id: 0,
									role: 'child',
									balance: 0,
									goal: 100,
									parent_id,
									name,
									email,
									password,
									login,
									confirmPassword,
								},
							],
						}),
					)
						.unwrap()
						.then((user) => {
							dispatch(setCredentials({ user }));
						});
				}

				setOpen(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Dialog
			sx={{}}
			open={open}
			onClose={() => setOpen(false)}
		>
			<DialogTitle sx={{ textAlign: 'center' }}>
				Регистрация ребёнка
			</DialogTitle>
			<Box
				component='form'
				sx={{
					width: '100%',
				}}
				noValidate
				onSubmit={handleSubmit(onSubmitHandler)}
			>
				<Grid
					container
					spacing={2}
					justifyContent='center'
					alignItems='center'
				>
					<Grid
						item
						xs={10}
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
						xs={10}
					>
						<TextField
							{...register('name', {
								required: 'name is required',
							})}
							autoComplete='name'
							name='name'
							fullWidth
							id='name'
							label='Name'
							autoFocus
						/>
					</Grid>
					<Grid
						item
						xs={10}
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
						xs={10}
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
						xs={10}
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
						{errors.login && (
							<p className='text-red-500'> {`${errors.login.message}`}</p>
						)}
						{errors.password && (
							<p className='text-red-500'> {`${errors.password.message}`}</p>
						)}
						{errors.name && (
							<p className='text-red-500'> {`${errors.name.message}`}</p>
						)}
						{errors.confirmPassword && (
							<p className='text-red-500'>
								{`${errors.confirmPassword.message}`}
							</p>
						)}
					</Grid>
				</Grid>

				<DialogActions sx={{ justifyContent: 'center' }}>
					<Button
						disabled={isSubmitting}
						type='submit'
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
					>
						Зарегистрироваться
					</Button>
					<Button onClick={() => setOpen(false)}>Отмена</Button>
				</DialogActions>
			</Box>
		</Dialog>
	);
};
