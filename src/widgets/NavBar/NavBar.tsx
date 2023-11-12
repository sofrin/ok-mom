import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { NavLink } from 'react-router-dom';

const parentLinks = [
	{
		to: '/Home/tasks',
		text: 'Задачи',
		icon: <AssignmentIcon />,
	},
	{
		to: '/Home/schedule',
		text: 'Расписание',
		icon: <CalendarMonthIcon />,
	},
	{
		to: '/Home/children',
		text: 'Дети',
		icon: <PeopleIcon />,
	},
	{
		to: '/Home/statistica',
		text: 'Статистика',
		icon: <BarChartIcon />,
	},
	{
		to: '/Home/gifts',
		text: 'Подарки',
		icon: <CardGiftcardIcon />,
	},
	{
		to: '/Home/suggestions',
		text: 'Предложения',
		icon: <LocalOfferIcon />,
	},
];
const childLinks = [
	{
		to: '/child/tasks',
		text: 'Задачи',
		icon: <AssignmentIcon />,
	},
	{
		to: '/child/schedule',
		text: 'Расписание',
		icon: <CalendarMonthIcon />,
	},
	{
		to: '/child/history',
		text: 'История',
		icon: <BarChartIcon />,
	},
	{
		to: '/child/gifts',
		text: 'Подарки',
		icon: <CardGiftcardIcon />,
	},
	{
		to: '/child/suggestions',
		text: 'Предложения',
		icon: <LocalOfferIcon />,
	},
];

export const NavBar = (
	<>
		{parentLinks.map((link) => (
			<NavLink
				key={link.to}
				to={link.to}
				className={({ isActive }) =>
					isActive ? 'text-blue-800 font-bold' : ''
				}
			>
				<ListItemButton>
					<ListItemIcon>{link.icon}</ListItemIcon>
					<ListItemText primary={link.text} />
				</ListItemButton>
			</NavLink>
		))}
	</>
);
export const ChildNavBar = (
	<>
		{childLinks.map((link) => (
			<NavLink
				key={link.to}
				to={link.to}
				className={({ isActive }) =>
					isActive ? 'text-blue-800 font-bold' : ''
				}
			>
				<ListItemButton>
					<ListItemIcon>{link.icon}</ListItemIcon>
					<ListItemText primary={link.text} />
				</ListItemButton>
			</NavLink>
		))}
	</>
);
