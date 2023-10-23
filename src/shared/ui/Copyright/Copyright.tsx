import { Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const Copyright = () => {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
		>
			{'Copyright © '}
			<RouterLink to={'/'}>
				VigrebuhaTechnology, Inc. {new Date().getFullYear()}
				{'.'}
			</RouterLink>
		</Typography>
	);
};
