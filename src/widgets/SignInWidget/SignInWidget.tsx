import React from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { Grid } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';

import { SignInUpTemplate } from 'shared/ui/SignInUpTemplate/SignInUpTemplate';
import { SignInForm } from 'features/authentication/SignInForm';
import { useAuth } from 'shared/model/hooks';

export const SignInWidget = () => {
	const isAuth = useAuth();
	switch (isAuth.user?.role) {
		case 'parent':
			return <Navigate to='/Home/tasks' />;
		case 'child':
			return <Navigate to='/child/tasks' />;
		default:
			break;
	}
	return (
		<SignInUpTemplate
			avatar={<LockOutlinedIcon />}
			title={'Sign In'}
		>
			<SignInForm />
			<Grid container>
				<Grid
					item
					xs
				>
					<Link to='#'>Forgot password?</Link>
				</Grid>
				<Grid item>
					<Link to='/SignUp'>{"Don't have an account? Sign Up"}</Link>
				</Grid>
			</Grid>
		</SignInUpTemplate>
	);
};
