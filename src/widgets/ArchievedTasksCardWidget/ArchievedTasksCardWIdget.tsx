import React from "react";
import { TaskCardTemplate } from "src/shared/ui/TaskCardTemplate/TaskCardTemplate";
import { Grid, Typography } from '@mui/material';
import { Item } from "src/shared/ui/Item/Item";
import { filteredArchievedTasks } from "src/entities/CardTask/modal/filterTasks";
import { CardTaskList } from "src/entities/CardTask/ui/CardTaskList";

import { taskSchema } from "../../shared/types";

type Props = {
  child: string,
  tasks: taskSchema[],
  setTasks: React.Dispatch<React.SetStateAction<taskSchema[]>>,
  isLoading: boolean,
  setDraggableTask: React.Dispatch<React.SetStateAction<taskSchema | undefined>>
  draggableTask: taskSchema | undefined
};



export const ArchievedTaskCardWidget = ({ child, tasks, setTasks, isLoading, setDraggableTask, draggableTask }: Props) => {

  const filteredChildTasks = filteredArchievedTasks(tasks)


  return (
    <TaskCardTemplate setTasks={setTasks} child={'Задания в архиве'} setDraggableTask={setDraggableTask} draggableTask={draggableTask}>
      <Grid container direction="row" item spacing={1} justifyContent='space-between'  >
        <Grid item xs={5} md={4} >
          <Item ><Typography variant='body1' component="h3">{child}</Typography></Item>
        </Grid>

      </Grid>
      <CardTaskList archieved isLoading={isLoading} tasks={tasks} setTasks={setTasks} setDraggableTask={setDraggableTask} draggableTask={draggableTask} child={child} filteredTasks={filteredChildTasks} />
    </TaskCardTemplate>
  )
}
