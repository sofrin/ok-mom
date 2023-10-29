import AssignmentIcon from '@mui/icons-material/Assignment';
import {
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
} from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const secondaryListItems = (
	<React.Fragment>
		<ListSubheader
			component='div'
			inset
		>
			Views
		</ListSubheader>
		<NavLink
			to={'/Home/tasks'}
			className={({ isActive }) => (isActive ? 'text-blue-800 font-bold' : '')}
		>
			<ListItemButton>
				<ListItemIcon>
					<AssignmentIcon />
				</ListItemIcon>
				<ListItemText primary='Parent page' />
			</ListItemButton>
		</NavLink>
		<NavLink
			to={'/child/tasks'}
			className={({ isActive }) => (isActive ? 'text-blue-800 font-bold' : '')}
		>
			<ListItemButton>
				<ListItemIcon>
					<AssignmentIcon />
				</ListItemIcon>
				<ListItemText primary='Child page' />
			</ListItemButton>
		</NavLink>
	</React.Fragment>
);
