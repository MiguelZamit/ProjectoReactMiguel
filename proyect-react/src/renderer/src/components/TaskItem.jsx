import React from "react";
import { Card, Flex } from "antd";
import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";



export default function TaskItem({ task, index, handleCheckboxChange, handleDelete}) {

    const navigate = useNavigate()


    function deleteItem(index) {
        
        handleDelete(index)

        window.api.deleteTask(task) // Aqui lo elimino de la base de datos

    }


    const actions = [
        <EditOutlined key="edit" onClick={() => navigate(`/editView/${index}`)}/>,
        <InfoCircleOutlined key="info" />,
        <DeleteOutlined key="delete" onClick={() => deleteItem(index)}/>
    ];

    return (
        <Flex gap="middle" align="start" vertical>
            <Card
                actions={actions}
                style={{
                    minWidth: 300,
                }}
            >
                <input
                    type="checkbox"
                    style={{ float: "right" }}
                    //checked={task.isChecked}
                    onChange={() => handleCheckboxChange(index)} // Notifica al padre
                />
                <Card.Meta
                    title={task.name}
                    description={task.description || "No description available"}
                />

                <small style={{color: "grey"}}>Deadline -- {task.deadline}</small>
            </Card>
        </Flex>
    );
}
