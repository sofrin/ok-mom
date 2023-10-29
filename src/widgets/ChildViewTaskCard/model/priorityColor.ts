import { red, grey, purple, indigo } from '@mui/material/colors';

export const priorityColor = (priority: string) => {
	switch (priority) {
		case 'low':
			return grey[300];

		case 'mid':
			return indigo[300];

		case 'high':
			return purple[500];

		case 'critical':
			return red[300];
		default:
			break;
	}
};
