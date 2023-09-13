import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { AddTaskDialog, taskAddSchema } from '../Components/AddTaskDialog';
import { ChildTaskCard } from '../Components/ChildTaskCard';
import { CompletedTaskCard } from '../Components/CompletedTaskCard';



export type tasksResponse = taskAddSchema & { id: string }
export type tasksCompleted = taskAddSchema & { id?: string, completed: boolean }
export default function Home() {
  const [openForm, setOpenForm] = React.useState(false);

  const [tasks, setTasks] = React.useState<tasksResponse[]>([]);
  React.useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`https://64f8d138824680fd21801557.mockapi.io/tasks`, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      })
      const tasks = await response.json()
      // console.log(tasks);
      setTasks(tasks)

    };
    fetchTasks()

  }, []);
  console.log(tasks);

  return (

    <Grid container spacing={3}>
      <ChildTaskCard key={`Ребёнок 1`} child='Ребёнок 1' tasks={tasks} setOpen={setOpenForm} setTasks={setTasks} />
      <ChildTaskCard key={`Ребёнок 2`} child='Ребёнок 2' tasks={tasks} setOpen={setOpenForm} setTasks={setTasks} />
      <CompletedTaskCard key={'Completed'} tasks={tasks} setTasks={setTasks} />
      <Grid item xs={12} lg={6}>
        <Paper sx={{ p: 2, display: 'flex', height: 70, alignItems: 'center', justifyContent: 'center' }}>
          <AddTaskDialog setTasks={setTasks} open={openForm} setOpen={setOpenForm} tasks={tasks} />
        </Paper>
      </Grid>
    </Grid>

  );
}
