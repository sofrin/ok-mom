import * as React from 'react';
import Grid from '@mui/material/Grid';
import { AddTaskDialog, taskSchema } from '../Components/AddTaskDialog';
import { ChildTaskCard } from '../Components/ChildTaskCard';
import { CompletedTaskCard } from '../Components/CompletedTaskCard';
import { ArchivedTasksCard } from '../Components/ArchivedTasksCard';
import { Search } from '../Components/Search';





export default function Home() {
  const [openForm, setOpenForm] = React.useState(false);
  const [defaultChild, setdefaultChild] = React.useState('Ребёнок 1');
  const [isLoading, setisLoading] = React.useState(false);

  const [tasks, setTasks] = React.useState<taskSchema[]>([]);
  const [draggableTask, setDraggableTask] = React.useState<taskSchema>();
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
    <>
      <Search setTasks={setTasks} setisLoading={setisLoading} tasks={tasks} />

      <Grid container spacing={3}>

        <Grid item xs={6} md={4} lg={6} > <ChildTaskCard key={`Ребёнок 1`} child='Ребёнок 1' tasks={tasks} setOpen={setOpenForm} setTasks={setTasks}
          setdefaultChild={setdefaultChild} isLoading={isLoading} setDraggableTask={setDraggableTask} draggableTask={draggableTask} /></Grid>
        <Grid item xs={6} md={4} lg={6}> <ChildTaskCard key={`Ребёнок 2`} child='Ребёнок 2' tasks={tasks} setOpen={setOpenForm} setTasks={setTasks}
          setdefaultChild={setdefaultChild} isLoading={isLoading} setDraggableTask={setDraggableTask} draggableTask={draggableTask} /></Grid>

        <Grid item xs={6} md={4} lg={6}>  <CompletedTaskCard tasks={tasks} setTasks={setTasks} isLoading={isLoading} setDraggableTask={setDraggableTask} draggableTask={draggableTask} /></Grid>
        <Grid item xs={6} md={4} lg={6}>  <ArchivedTasksCard tasks={tasks} setTasks={setTasks} isLoading={isLoading} setDraggableTask={setDraggableTask} draggableTask={draggableTask} /></Grid>
        <Grid item xs={6} md={4} lg={6}>
          {openForm && <AddTaskDialog setTasks={setTasks} open={openForm} setOpen={setOpenForm} tasks={tasks} defaultChild={defaultChild} />}
        </Grid>
      </Grid></>


  );
}
