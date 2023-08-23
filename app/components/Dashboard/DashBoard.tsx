'use client'

import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { getAllTodoTasksByUserId, addTodoTask, verifyToken, deleteTodoTaskById } from "@/app/database/actions";
import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";
import TaskList from "./TaskList";


interface todoTask {
    id?: number
    userId: number,
    content: string,
}

const Dashboard = () => {
    const router = useRouter();
    
    const dispatch = useAppDispatch();
    const SECRET_KEY = 'thanhtam';    
    const userState = useAppSelector(state=>state.user);
    // console.log(userState);
    const taskState = useAppSelector(state => state.task);
    // console.log(taskState);
    const [currentUserId, setCurrentUserId] = useState(0);
    
    useEffect(()=>{
        const token = sessionStorage.getItem("user");
        if(!token){
            return;
        }else{
            dispatch(verifyToken(token) as any);
        }
    },[])
    
    useEffect(()=>{
        if(userState.Verifysuccess == "error"){
            router.push("/redirect");
        }else if(userState.Verifysuccess == "success"){
            const token = sessionStorage.getItem("user");
            if(!token){return;}
            const decoded = jwt_decode(token);
            if(decoded){
                setCurrentUserId(Number(decoded.id));
        }
        try{
            console.log(`current userId: `, currentUserId )
            dispatch(getAllTodoTasksByUserId(currentUserId));   
        } catch(err){
            console.log("error");
        }
        }
    }, [userState.Verifysuccess, currentUserId])



    useEffect(()=>{
        console.log("task state list update");
    },[taskState.tasks])

    

    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [count, setCount] = useState(0);
    
    // const reload=()=>window.location.reload();
    const [task, setTask] = useState('');
    
    const handleAddTask = () =>{
        dispatch(addTodoTask({
            name: task,
            userId: currentUserId,
        }))
    }


    return ( 
        <div style={{border: "1px solid black", borderRadius: "10px"}}>
            <Row>
                <Col lg={6}>
                    <p>Daily Tasks</p>
                </Col>
                <Col lg={6}>
                    <Button style={{color: 'black'}} variant="primary" onClick={handleShow}>
                        Add
                    </Button>
                </Col>
            </Row>
            
            {taskState.tasks && <TaskList todoTaskList={taskState.tasks} ></TaskList> }
                
            


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Task!</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{textAlign: "center"}}>
                    <input className="text-dark border-2" type="text" value={task} onChange={(e)=>setTask(e.target.value)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="text-dark" variant="primary" onClick={handleAddTask}>
                        Add
                    </Button>
                    <Button className="text-dark" variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
     );
}
 
export default Dashboard;