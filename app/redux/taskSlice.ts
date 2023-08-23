'use client'

import { createSlice } from "@reduxjs/toolkit"
import { addTodoTask, getAllTodoTasksByUserId, deleteTodoTaskById } from "../database/actions"

interface ITask{
    id?: number,
    name: string,
    userId: number,
}

interface taskSlice{
    tasks: Array<ITask>
}

const initialStateTask: taskSlice = {
    tasks: []
}

export const taskSlice = createSlice({
    name: 'task',
    initialState: initialStateTask,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(addTodoTask.fulfilled, (state, action)=>{
            state.tasks.push(action.payload.task)
        })

        .addCase(getAllTodoTasksByUserId.pending, (state, action)=>{
            console.log("pending");
            
        })
        .addCase(getAllTodoTasksByUserId.fulfilled, (state, action) => {
            state.tasks = action.payload.todoTasks
            console.log(`tasks: `, action.payload.todoTasks);
        })

        .addCase(deleteTodoTaskById.fulfilled, (state, action) => {
            const taskDeleted = state.tasks.find((task) => task.id === action.payload.taskId)
            if(taskDeleted){
                state.tasks = state.tasks.filter(task => task.id !== action.payload.taskId)
            }
        })
    }
})

export const taskReducer = taskSlice.reducer;