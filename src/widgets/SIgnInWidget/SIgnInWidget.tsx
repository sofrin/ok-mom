import React from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import { SignInUpTemplate } from 'shared/ui/SignInUpTemplate/SignInUpTemplate';
import { SignInForm } from 'entities/SignInForm/SIgnInForm';

export const SignInWidget = () => {
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
