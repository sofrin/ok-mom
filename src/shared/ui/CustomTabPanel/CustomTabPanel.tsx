import { Grid } from '@mui/material';
interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

export function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Grid
					container
					spacing={2}
					justifyContent='center'
					alignItems='center'
					sx={{
						p: 3,
					}}
				>
					{children}
				</Grid>
			)}
		</div>
	);
}
