import CircleIcon from '@mui/icons-material/Circle';
export const priorityCircle = (priority: string) => {
  switch (priority) {
    case 'Низкий':
      return <CircleIcon fontSize={'small'} sx={{ fontSize: 10 }} />
    case 'Средний':
      return <CircleIcon color='secondary' fontSize={'small'} sx={{ fontSize: 10 }} />
    case 'Высокий':
      return <CircleIcon color='primary' fontSize={'small'} sx={{ fontSize: 10 }} />
    case 'Критический':
      return <CircleIcon color='error' fontSize={'small'} sx={{ fontSize: 10 }} />

    default:
      break;
  }
}
