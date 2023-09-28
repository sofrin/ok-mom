import React, { DragEvent, ReactNode } from "react";
import { Grid, Paper } from '@mui/material';
import { taskSchema } from "src/shared/types";


type Props = {
  setTasks: React.Dispatch<React.SetStateAction<taskSchema[]>>,
  setDraggableTask: React.Dispatch<React.SetStateAction<taskSchema | undefined>>
  draggableTask: taskSchema | undefined,
  child: string,
  children: ReactNode
};

export const TaskCardTemplate = ({ setTasks, setDraggableTask, draggableTask, child, children }: Props) => {
  function dropHandler(e: DragEvent): void {
    e.preventDefault()

    console.log(`draggableTask`, draggableTask);
    if (draggableTask) {
      console.log(`child`, child);
      switch (child) {
        case "Выполненые задания":
          draggableTask.isArchived = 'false'
          draggableTask.isCompleted = 'true'

          break;
        case "Задания в архиве":
          draggableTask.isArchived = 'true'
          draggableTask.isCompleted = 'true'
          break;
        default:
          draggableTask.child = child
          draggableTask.isArchived = 'false'
          draggableTask.isCompleted = 'false'
          break;
      }

      fetch(
        'https://64f8d138824680fd21801557.mockapi.io/tasks/' + draggableTask.id,
        {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          // Send your data in the request body as JSON
          body: JSON.stringify(draggableTask)
        },
      );
      setTasks((prev: taskSchema[]) => prev.filter((task) => task.id !== draggableTask.id))
      setTasks((prev) => [...prev, draggableTask])
      setDraggableTask(undefined)

    }
  }
  function dragOverHandler(e: DragEvent) {
    e.preventDefault()
  }

  return <>
    <Grid onDrop={(e) => dropHandler(e)} onDragOver={(e) => { dragOverHandler(e) }} item xs={12} md={12} lg={12}>
      <Paper
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          height: 450,

        }}
      >
        <Grid container direction="row" spacing={1} sx={{
          height: 450,

        }}>
          {children}
        </Grid >
      </Paper >
    </Grid >

  </>
};
