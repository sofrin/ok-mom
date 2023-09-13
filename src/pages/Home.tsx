import * as React from 'react';
import Grid from '@mui/material/Grid';
import { AddTaskDialog, taskAddSchema } from '../Components/AddTaskDialog';
import { ChildTaskCard } from '../Components/ChildTaskCard';
import { CompletedTaskCard } from '../Components/CompletedTaskCard';



export type tasksResponse = taskAddSchema & { id: string }
export type tasksCompleted = taskAddSchema & { id?: string, completed: boolean }
export default function Home() {
  const [openForm, setOpenForm] = React.useState(false);
  const [defaultChild, setdefaultChild] = React.useState('Ребёнок 1');
  const [isLoading, setisLoading] = React.useState(false);

  const [tasks, setTasks] = React.useState<tasksResponse[]>([]);
  React.useEffect(() => {
    const fetchTasks = async () => {
      setisLoading(true)
      const response = await fetch(`https://64f8d138824680fd21801557.mockapi.io/tasks`, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      })
      const tasks = await response.json()
      // console.log(tasks);
      setTasks(tasks)
      setisLoading(false)

    };
    fetchTasks()

  }, []);
  console.log(tasks);

  return (

    <Grid container spacing={3}>

      <Grid item xs={6} md={4} lg={6} > <ChildTaskCard key={`Ребёнок 1`} child='Ребёнок 1' tasks={tasks} setOpen={setOpenForm} setTasks={setTasks} setdefaultChild={setdefaultChild} isLoading={isLoading} /></Grid>
      <Grid item xs={6} md={4} lg={6}> <ChildTaskCard key={`Ребёнок 2`} child='Ребёнок 2' tasks={tasks} setOpen={setOpenForm} setTasks={setTasks} setdefaultChild={setdefaultChild} isLoading={isLoading} /></Grid>

      <Grid item xs={6} md={4} lg={6}>  <CompletedTaskCard key={'Completed'} tasks={tasks} setTasks={setTasks} isLoading={isLoading} /></Grid>
      <Grid item xs={6} md={4} lg={6}>
        {openForm && <AddTaskDialog setTasks={setTasks} open={openForm} setOpen={setOpenForm} tasks={tasks} defaultChild={defaultChild} />}
      </Grid>
    </Grid>

  );
}
