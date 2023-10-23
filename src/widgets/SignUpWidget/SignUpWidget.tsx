import React from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { SignInUpTemplate } from 'shared/ui/SignInUpTemplate/SignInUpTemplate';
import { SignUpForm } from 'features/authentication/SignUpForm';

export const SignUpWidget = () => {
	return (
		<SignInUpTemplate
			avatar={<LockOutlinedIcon />}
			title={'Sign Up'}
		>
			<SignUpForm />
			<Grid
				container
				justifyContent='flex-end'
			>
				<Grid item>
					<Link to='/SignIn'>Already have an account? Sign in</Link>
				</Grid>
			</Grid>
		</SignInUpTemplate>
	);
};
