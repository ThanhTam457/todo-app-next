'use client'

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { addTodoTask, deleteTodoTaskById } from "@/app/database/actions";
import { Row, Col, Button } from "react-bootstrap";


type todoTask = {
    id: number
    name: string,
}

type props = {
    todoTaskList: Array<todoTask>;
}


const TaskList = (props: props) => {
    const dispatch = useAppDispatch();
    const taskState = useAppSelector(state=>state.task);

    function todoTaskDeleteOnClickHandle(event: React.MouseEvent, id: number) {
        event.preventDefault();

        dispatch(deleteTodoTaskById(id) as any);
    }

    return ( 
        <div className="task-list">
            {props.todoTaskList.map((task:todoTask, index:number) => (
                <Row key={task.id}>
                <Col><input type={"checkbox"}></input></Col>
                <Col style={{paddingBottom: "10px", fontSize: "larger", textAlign: "start"}}>{task.name}</Col>
                <Col style={{paddingRight: "5rem"}}><Button className="btn btn-danger text-dark" onClick={(e)=>todoTaskDeleteOnClickHandle(e, task.id)}>
                    Delete</Button></Col>
            </Row>
            ))}
        </div>
     );
}
 
export default TaskList;
