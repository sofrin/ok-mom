import CircleIcon from '@mui/icons-material/Circle';
export const priorityCircle = (priority: string) => {
	switch (priority) {
		case 'low':
			return (
				<CircleIcon
					fontSize={'small'}
					sx={{ fontSize: 10 }}
				/>
			);
		case 'mid':
			return (
				<CircleIcon
					color='secondary'
					fontSize={'small'}
					sx={{ fontSize: 10 }}
				/>
			);
		case 'high':
			return (
				<CircleIcon
					color='primary'
					fontSize={'small'}
					sx={{ fontSize: 10 }}
				/>
			);
		case 'critical':
			return (
				<CircleIcon
					color='error'
					fontSize={'small'}
					sx={{ fontSize: 10 }}
				/>
			);

		default:
			break;
	}
};
