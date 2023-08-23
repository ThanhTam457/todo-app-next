
import db from "./index";
import jwt from 'jsonwebtoken';

import { createAsyncThunk } from "@reduxjs/toolkit";
import { table } from "console";

let IDB: IDBDatabase;

interface User_validate {
    email: string,
    password: string,
}

interface User_validate_extend{
    name: string,
    id?: number,
}

const SECRET_KEY = 'thanhtam';

export const ValidateLogin = createAsyncThunk('user/validate-login', async (user: User_validate)=>{
    return new Promise<{result: boolean, n_user:User_validate_extend, token: string}>((resolve, reject)=>{
        db().then((result)=>{
            IDB = result as IDBDatabase;
            const transaction = IDB.transaction('users', 'readonly');
            const store = transaction.objectStore('users');
            const key = store.index('email');

            let query = key.get([user.email]);

            query.onerror = () => reject({result: false, token: ""});
            query.onsuccess = () =>{
                if(query.result && query.result.password === user.password) {
                    let queryKey = key.getKey([user.email]);
                    queryKey.onerror = () => reject ({result: false, token: ""});
                    queryKey.onsuccess = () =>{
                        let queryResult = query.result;
                        console.log(queryResult);
                        
                        const token = jwt.sign({
                            id: queryResult.id,
                            name: queryResult.name,
                        },
                        SECRET_KEY,
                        {
                            expiresIn: '12 hours',
                        });
                        queryResult.id = queryKey.result;
                        
                        resolve({result: true, n_user: {name: queryResult.name, id: queryResult.id}, token: token});
                        console.log(jwt);
                        sessionStorage.setItem('user', token);
                    }
                }
                else reject({result: false, token: ""});
            };

            transaction.oncomplete= () => IDB.close();
        }).catch((error) => {
            reject({result: false, token: ""});
        });
    });
});

export const addUserToDb = createAsyncThunk('user/add', async(user:User_validate_extend)=> {
    return new Promise<{result: boolean, token: string}>((resolve, reject) => {
        db().then((result) => {
            IDB = result as IDBDatabase ;
            const txn = IDB.transaction('users', 'readwrite');
            const store = txn.objectStore('users');
            let query = store.put(user);
            
            query.onsuccess = (e) => { 
                const target:any = e.target;
                user.id = target.result;
                const token = jwt.sign(
                    {
                      id: user.id,
                      name: user.name,
                    },
                    SECRET_KEY,
                    {
                        expiresIn: 60 * 60 * 12 
                    }
                );
                resolve({result: true, token: token});
                sessionStorage.setItem('user', token);
            }

            query.onerror = () => { reject({result: false,  token: ""}) }
            txn.oncomplete = () => IDB.close();
        }).catch((error) => {
            reject({result: false, token: ""});
        });
    });
});

export const verifyToken = createAsyncThunk('user/verifytoken', async(token: string)=>{
    return new Promise<{result: boolean, token?:string}>((resolve, reject)=>{
        try{
            const decoded = jwt.verify(token, SECRET_KEY);
            resolve({result: true, token: token});
        } catch(err){
            reject({result: false});
        }
    })
})

interface ITask {
    id?: number
    userId: number,
    name: string,
}

export const addTodoTask = createAsyncThunk('todo-task/add', async (task: ITask) => {
    return new Promise<{result: boolean, task: ITask}>((resolve, reject) => {
        db().then((result) => {
            IDB = result as IDBDatabase ;
            const transaction = IDB.transaction('tasks', 'readwrite');
            const store = transaction.objectStore('tasks');
            let query = store.put(task);
            
            query.onsuccess = (e) => {
                const target:any = e.target;   
                task.id = target.result;
                resolve({result: true, task: task});
            }

            query.onerror = () => { reject({result: false, user: task}); console.log(query.error); }
            transaction.oncomplete = () => IDB.close();
        }).catch((error) => {
            reject({result: false, user: task});
        });
    });
});

export const getAllTodoTasksByUserId = createAsyncThunk('todo-task/get-all-todo-tasks-by-user-id', async (userId: number) => {
    return new Promise<{result: boolean, todoTasks: Array<ITask>}>((resolve, reject) => {
        db().then((result) => {
            IDB = result as IDBDatabase ;
            const transaction = IDB.transaction('tasks', 'readonly');
            const store = transaction.objectStore('tasks');            
            const indexUserId = store.index('userId');
            
            let query = indexUserId.getAll([userId]);
           
            query.onerror = () => reject({result: false, todoTasks: []});
            query.onsuccess = () => {        
                const todoTasksList = query.result;
                
                let queryKey = indexUserId.getAllKeys([userId]);
                

                queryKey.onerror = () => reject({result: false, todoTasks: []});
                
                queryKey.onsuccess = () => {
                    todoTasksList.forEach((todoTask:any, index:number)=> {
                        todoTask["id"] = queryKey.result[index];
                    });                    
                    resolve({result: true, todoTasks: todoTasksList});
                }
            };
            transaction.oncomplete = () => IDB.close();
        });
    });
});

export const deleteTodoTaskById = createAsyncThunk('todo-task/delete-todo-task-done-by-id', async (taskId: number) => {
    return new Promise<{ result: boolean, taskId: number }>((resolve, reject) => {        
        db().then((result) => {
            IDB = result as IDBDatabase ;
            const txn = IDB.transaction('tasks', 'readwrite');
            const store = txn.objectStore('tasks');
            store.openCursor(taskId).onerror = () => { reject({ result: false, taskId: taskId}); }
            store.openCursor(taskId).onsuccess = (event: any) => {
                const cursor = event.target.result;

                const requestUpdate = cursor.delete();
                requestUpdate.onerror = () => { reject({ result: false, taskId: taskId}); }
                requestUpdate.onsuccess = () => { resolve({result: true, taskId: taskId }); }
            }
            
            txn.oncomplete = () => IDB.close();
        });
    });
});
