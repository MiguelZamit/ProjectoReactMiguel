import React, { useState } from "react";
import { ConfigProvider, Modal, Card, Flex } from "antd";
import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { createStyles, useTheme } from "antd-style";
import { useNavigate } from "react-router-dom";

export default function TaskItem({ task, index, handleCheckboxChange, handleDelete }) {
    const navigate = useNavigate();

    const useStyle = createStyles(({ token }) => ({
        "my-modal-body": {
            background: token["blue-1"],
            padding: token.paddingXXS, // No funciona lo del padding
        },
        "my-modal-mask": {
            boxShadow: `inset 0 0 15px #fff`,
        },
        "my-modal-header": {
            borderBottom: `1px dotted ${token.colorPrimary}`,
        },
        "my-modal-content": {
            border: "1px solid #333",
        },
    }));

    const [isModalOpen, setIsModalOpen] = useState(false); // Simplificar el estado a un booleano
    const { styles } = useStyle();
    const token = useTheme();

    const toggleModal = (target) => {
        setIsModalOpen(target);
    };

    const classNames = {
        body: styles["my-modal-body"],
        mask: styles["my-modal-mask"],
        header: styles["my-modal-header"],
        content: styles["my-modal-content"],
    };

    const modalStyles = {
        header: {
            borderLeft: `5px solid ${token.colorPrimary}`,
            borderRadius: 0,
            paddingInlineStart: 5,
        },
        body: {
            boxShadow: "inset 0 0 5px #999",
            borderRadius: 5,
        },
        mask: {
            backdropFilter: "blur(10px)",
        },
        content: {
            boxShadow: "0 0 30px #999",
        },
    };

    function deleteItem() {
        handleDelete(task.id);
        window.api.deleteTask(task); // Aquí lo eliminas de la base de datos
    }

    const actions = [
        <EditOutlined key="edit" onClick={() => navigate(`/editView/${task.id}`)} />,
        <InfoCircleOutlined key="info" onClick={() => toggleModal(true)} />,
        <DeleteOutlined key="delete" onClick={() => deleteItem(index)} />,
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
                    onChange={() => handleCheckboxChange(index)}
                />
                <Card.Meta
                    title={task.name}
                    description={task.description || "No description available"}
                />
                <small style={{ color: "grey" }}>Deadline -- {task.deadline}</small>
            </Card>


            {/* Modal dentro del JSX principal */}
            <ConfigProvider
                modal={{
                    classNames,
                    styles: modalStyles,
                }}
            >
                <Modal
                    title="Task Info"
                    open={isModalOpen}
                    onCancel={() => toggleModal(false)} // El botón "X" para cerrar el modal
                    footer={null} // Eliminar el pie con el botón de "OK"
                >
                    <p>Title: {task.name}</p>
                    <p>Status: {task.status}</p>
                    <p>Description: {task.description || "No description available"}</p>
                    <p>Deadline: {task.deadline}</p>
                </Modal>

            </ConfigProvider>
        </Flex>
    );
}
