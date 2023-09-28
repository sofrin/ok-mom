import * as React from 'react';
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

export const NavBar = (
  <React.Fragment>
    <NavLink to={'/Home/tasks'} className={({ isActive }) =>
      isActive ? "text-blue-800 font-bold" : ""
    }>
      <ListItemButton >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Задачи" />
      </ListItemButton></NavLink>
    <NavLink to={'/Home/schedule'} className={({ isActive }) =>
      isActive ? "text-blue-700 font-bold" : ""
    }>
      <ListItemButton>
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary="Расписание" />
      </ListItemButton></NavLink>
    <NavLink to={'/Home/children'} className={({ isActive }) =>
      isActive ? "text-blue-700 font-bold" : ""
    }> <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Дети" />
      </ListItemButton></NavLink>
    <NavLink to={'/Home/statistica'} className={({ isActive }) =>
      isActive ? "text-blue-700 font-bold" : ""
    }> <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Статистика" />
      </ListItemButton></NavLink>
    <NavLink to={'/Home/gifts'} className={({ isActive }) =>
      isActive ? "text-blue-700 font-bold" : ""
    }><ListItemButton>
        <ListItemIcon>
          <CardGiftcardIcon />
        </ListItemIcon>
        <ListItemText primary="Подарки" />
      </ListItemButton></NavLink>
    <NavLink to={'/Home/suggestions'} className={({ isActive }) =>
      isActive ? "text-blue-700 font-bold" : ""
    }><ListItemButton>
        <ListItemIcon>
          <LocalOfferIcon />
        </ListItemIcon>
        <ListItemText primary="Предложения" />
      </ListItemButton></NavLink>
  </React.Fragment >
);
