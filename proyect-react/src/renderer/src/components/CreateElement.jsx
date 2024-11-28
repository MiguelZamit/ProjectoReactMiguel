import TaskItem from "./TaskItem";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/style.css"
import { useNavigate } from "react-router-dom";

import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    EllipsisOutlined,
    StopOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import { FloatButton } from "antd";

export default function CreateElement({ tasks, setTasks, originalTasks, setOriginalTasks, filteredTasks, setFilteredTasks, isHidden, setIsHidden, handleDelete }) {

    const navigate = useNavigate()
    console.log(tasks); // No se porque pero el actulizar funciona pero me sale undefined en consola


    function handleCheckboxChange(index) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, isChecked: !task.isChecked } : task
        );
        setTasks(updatedTasks);
        setOriginalTasks(updatedTasks); // Actualizar lista original
    }

    function moveSelectedTasks(newStatus) {
        const updatedTasks = tasks.map((task) =>
            task.isChecked ? { ...task, status: newStatus, isChecked: false } : task
        );
        setTasks(updatedTasks);
        setOriginalTasks(updatedTasks); // Asegurar consistencia
        setFilteredTasks(updatedTasks); // Asegurar consistencia con el filtro activo
    }

    function handleFilterByTitle() {
        const titleFilter = document.getElementById("iptTitle").value.trim();
        if (titleFilter === "") {
            setFilteredTasks(originalTasks); // Restaurar todas las tareas
            return;
        }

        const updatedTasks = originalTasks.filter((task) =>
            task.name.toLowerCase().includes(titleFilter.toLowerCase())
        );

        setFilteredTasks(updatedTasks);
    }

    function handleFilterByStatus() {
        const statusFilter = document.getElementById("iptStatus").value.trim();
        if (statusFilter === "") {
            setFilteredTasks(originalTasks); // Restaurar todas las tareas
            return;
        }

        const updatedTasks = originalTasks.filter(
            (task) => task.status.toLowerCase() === statusFilter.toLowerCase()
        );

        setFilteredTasks(updatedTasks);
    }

    function handleSortByDate() {
        const dateInput = document.getElementById("iptDate").value;
        if (dateInput === "") return;

        const sortedTasks = [...filteredTasks].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );

        setFilteredTasks(sortedTasks);
    }

    function hideShowCompletedAndCanceled() {
        setIsHidden(!isHidden);
    }

    return (
        <>
            <div className="background">

                <h1>Task List</h1>
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Sort list by:
                    </button>
                    <small style={{ color: "grey", fontFamily: "monospace", marginLeft: "4px" }}>
                        Remove the text from the filter to recover the cards info
                    </small>
                    <ul className="dropdown-menu dropdown-menu-dark">
                        <li>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Example: 'Make Exercise'"
                                    id="iptTitle"
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={handleFilterByTitle}
                                >
                                    Search
                                </button>
                                <small style={{ color: "grey", fontFamily: "monospace", margin: "7px" }}>
                                    Sort by Title
                                </small>
                            </div>
                        </li>
                        <li>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="iptStatus"
                                    placeholder="Example: 'In Progress'"
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={handleFilterByStatus}
                                >
                                    Search
                                </button>
                                <small style={{ color: "grey", fontFamily: "monospace", margin: "7px" }}>
                                    Sort by Status
                                </small>
                            </div>
                        </li>
                        <li>
                            <div className="input-group mb-3">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="iptDate"
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={handleSortByDate}
                                >
                                    Search
                                </button>
                                <small style={{ color: "grey", fontFamily: "monospace", margin: "7px" }}>
                                    Sort by Date
                                </small>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="row gap-3">
                    <form className="input-group mb-3" > {/* onSubmit={handleCreateTask} */}
                        <input name="itemName" type="text" id="taskName" className="form-control" />
                        <button className="btn btn-primary" type="submit" onClick={() => navigate(`/createTask`)}>
                            Add
                        </button>
                    </form>

                    <div className="container text-center">
                        <div className="row align-items-start">
                            <div className="col">
                                Pending
                                <ul className="list-group">
                                    {filteredTasks // Cmabiado esto
                                        .filter((task) => task.status === "Pending")
                                        .map((task, index) => (
                                            <TaskItem
                                                key={task.id}
                                                task={task}
                                                index={index}
                                                handleDelete={handleDelete}
                                                handleCheckboxChange={handleCheckboxChange}
                                            />
                                        ))}
                                </ul>
                            </div>
                            <div className="col">
                                In Progress
                                <ul className="list-group">
                                    {filteredTasks
                                        .filter((task) => task.status === "In Progress")
                                        .map((task, index) => (
                                            <TaskItem
                                                key={task.id}
                                                task={task}
                                                index={index}
                                                handleDelete={handleDelete}
                                                handleCheckboxChange={handleCheckboxChange}
                                            />
                                        ))}
                                </ul>
                            </div>
                            <div className="col">
                                Completed
                                {!isHidden && (
                                    <ul className="list-group">
                                        {filteredTasks
                                            .filter((task) => task.status === "Completed")
                                            .map((task, index) => (
                                                <TaskItem
                                                    key={task.id}
                                                    task={task}
                                                    index={index}
                                                    handleDelete={handleDelete}
                                                    handleCheckboxChange={handleCheckboxChange}
                                                />
                                            ))}
                                    </ul>
                                )}
                            </div>
                            <div className="col">
                                Canceled
                                {!isHidden && (
                                    <ul className="list-group">
                                        {filteredTasks
                                            .filter((task) => task.status === "Canceled")
                                            .map((task, index) => (
                                                <TaskItem
                                                    key={task.id}
                                                    task={task}
                                                    index={index}
                                                    handleDelete={handleDelete}
                                                    handleCheckboxChange={handleCheckboxChange}
                                                />
                                            ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <FloatButton.Group
                trigger="hover"
                type="primary"
                style={{
                    insetInlineEnd: 30,
                }}
                icon={<EllipsisOutlined />}
            >
                <FloatButton
                    tooltip="Hide/Show Completed and Canceled Tasks"
                    onClick={hideShowCompletedAndCanceled}
                    icon={<EyeOutlined />}
                />
                <FloatButton
                    tooltip="Send to Completed"
                    onClick={() => moveSelectedTasks("Completed")}
                    icon={<CheckCircleOutlined />}
                />
                <FloatButton
                    tooltip="Send to In Progress"
                    onClick={() => moveSelectedTasks("In Progress")}
                    icon={<ClockCircleOutlined />}
                />
                <FloatButton
                    tooltip="Send to Canceled"
                    onClick={() => moveSelectedTasks("Canceled")}
                    icon={<StopOutlined />}
                />
            </FloatButton.Group>

        </>
    );
}
