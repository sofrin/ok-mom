import { Button, Grid, Paper, Typography } from '@mui/material';
import { useAuth } from 'shared/model/hooks';

import { ChildrenCard } from 'entities/ChildrenCard';
import { ChildSignUpForm } from '../features/authentication/ChildSighUpForm/ChildSighUpForm';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export const ParentChildren = () => {
	const isAuth = useAuth();

	const [open, setOpen] = useState(false);
	if (!isAuth.user || isAuth.user.role !== 'parent') {
		return <Navigate to='/signIn' />;
	}
	const children = isAuth.user.children;
	return (
		<Grid
			container
			sx={{ justifyContent: 'center', alignItems: 'center', height: '70vh' }}
		>
			<Grid
				item
				sx={{
					width: 'fit-content',
				}}
			>
				<Paper
					sx={{
						p: 3,
						display: 'flex',
						flexDirection: 'column',
						width: '1000px',
						height: '400px',
						alignItems: 'center',
						justifyContent: 'flex-start',
					}}
				>
					<Grid
						container
						spacing={2}
						justifyContent='center'
						alignItems={'center'}
						direction={'row'}
					>
						{children.length != 0 ? (
							children.map((child, index) => (
								<ChildrenCard
									goal={child.goal}
									key={index}
									index={index}
									childName={child.name}
									balance={child.balance}
								/>
							))
						) : (
							<Typography variant='h5'> Нет детей </Typography>
						)}
						<Grid
							container
							justifyContent='center'
							alignItems='center'
							mt={5}
						>
							<Button
								variant='contained'
								onClick={() => setOpen(true)}
							>
								Добавить ребёнка
							</Button>
						</Grid>
						<ChildSignUpForm
							open={open}
							setOpen={setOpen}
						/>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
};
