import * as React from 'react';
import Grid from '@mui/material/Grid';

import { Search } from '../Components/Search';
import ChildTaskCardWidget from 'src/widgets/ChildTaskCardWidget/ChildTaskCardWidget';
import CompletedTaskCardWidget from '../widgets/CompletedCardWidget/CompletedCardWidget';
import { ArchievedTaskCardWidget } from 'src/widgets/ArchievedTasksCardWidget/ArchievedTasksCardWIdget';
import { taskSchema } from 'src/shared/types';
import { AddTaskDialog } from 'src/widgets/AddTask/ui/AddTaskDialog';


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
      <Search setTasks={setTasks} setisLoading={setisLoading} />

      <Grid container spacing={3}>

        <Grid item xs={6} md={4} lg={6} > <ChildTaskCardWidget key={`Ребёнок 1`} child='Ребёнок 1' tasks={tasks} setOpen={setOpenForm} setTasks={setTasks}
          setdefaultChild={setdefaultChild} isLoading={isLoading} setDraggableTask={setDraggableTask} draggableTask={draggableTask} /></Grid>
        <Grid item xs={6} md={4} lg={6}> <ChildTaskCardWidget key={`Ребёнок 2`} child='Ребёнок 2' tasks={tasks} setOpen={setOpenForm} setTasks={setTasks}
          setdefaultChild={setdefaultChild} isLoading={isLoading} setDraggableTask={setDraggableTask} draggableTask={draggableTask} /></Grid>

        <Grid item xs={6} md={4} lg={6}>  <CompletedTaskCardWidget child='Выполненные задания' tasks={tasks} setTasks={setTasks} isLoading={isLoading} setDraggableTask={setDraggableTask} draggableTask={draggableTask} /></Grid>
        <Grid item xs={6} md={4} lg={6}>  <ArchievedTaskCardWidget child='Задания в архиве' tasks={tasks} setTasks={setTasks} isLoading={isLoading} setDraggableTask={setDraggableTask} draggableTask={draggableTask} /></Grid>
        <Grid item xs={6} md={4} lg={6}>
          {openForm && <AddTaskDialog setTasks={setTasks} open={openForm} setOpen={setOpenForm} tasks={tasks} defaultChild={defaultChild} />}
        </Grid>
      </Grid></>


  );
}
