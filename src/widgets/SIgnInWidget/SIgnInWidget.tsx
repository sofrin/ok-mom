import React from 'react';
import { SignInUpTemplate } from 'src/shared/ui/SignInUpTemplate/SignInUpTemplate';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SIgnInForm } from 'src/entities/SignInForm/SIgnInForm';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

export const SIgnInWidget = () => {
	return (
		<SignInUpTemplate
			avatar={<LockOutlinedIcon />}
			title={'Sign In'}
		>
			<SIgnInForm />
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
