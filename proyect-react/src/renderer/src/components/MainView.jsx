import { useState} from "react";
import TaskItem from "./TaskItem";
import { v4 as uuidv4 } from 'uuid';
import { CheckCircleOutlined, ClockCircleOutlined, StopOutlined, EyeOutlined, EllipsisOutlined } from '@ant-design/icons';
import { FloatButton } from "antd";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function MainView({ tasks, setTasks }) {
    const [isHidden, setIsHidden] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState(tasks);

    // Filtra las tareas por título
    const handleFilterByTitle = () => {
        const input = document.getElementById("iptTitle").value;
        if (input === "") {
            setFilteredTasks(tasks);
        } else {
            const updatedTasks = tasks.filter(task =>
                task.name.toLowerCase().includes(input.toLowerCase())
            );
            setFilteredTasks(updatedTasks);
        }
    };

    // Filtra las tareas por estado
    const handleFilterByStatus = () => {
        const input = document.getElementById("iptStatus").value;
        if (input === "") {
            setFilteredTasks(tasks);
        } else {
            const updatedTasks = tasks.filter(task =>
                task.status.toLowerCase() === input.toLowerCase()
            );
            setFilteredTasks(updatedTasks);
        }
    };

    // Ordena las tareas por fecha
    const handleSortByDate = () => {
        const input = document.getElementById("iptDate").value;
        if (input !== "") {
            const updatedTasks = [...filteredTasks].sort((a, b) => new Date(a.date) - new Date(b.date));
            setFilteredTasks(updatedTasks);
        }
    };

    // Mueve tareas seleccionadas a otro estado
    const moveSelectedTasks = (newStatus) => {
        const updatedTasks = tasks.map(task =>
            task.isChecked ? { ...task, status: newStatus, isChecked: false } : task
        );
        setTasks(updatedTasks);
    };

    // Muestra/oculta tareas completadas y canceladas
    const hideShowCompletedAndCanceled = () => {
        setIsHidden(!isHidden);
    };

    return (
        <>
            <h1>Task list</h1>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort list by:
                </button>
                <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id="iptTitle" placeholder="Search by Title" />
                            <button className="btn btn-outline-secondary" type="button" onClick={handleFilterByTitle}>Search</button>
                            <small style={{ color: "grey", fontFamily: "monospace", margin: "7px" }}>Sort by Title</small>
                        </div>
                    </li>
                    <li>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id="iptStatus" placeholder="Search by Status" />
                            <button className="btn btn-outline-secondary" type="button" onClick={handleFilterByStatus}>Search</button>
                            <small style={{ color: "grey", fontFamily: "monospace", margin: "7px" }}>Sort by Status</small>
                        </div>
                    </li>
                    <li>
                        <div className="input-group mb-3">
                            <input type="date" className="form-control" id="iptDate" />
                            <button className="btn btn-outline-secondary" type="button" onClick={handleSortByDate}>Search</button>
                            <small style={{ color: "grey", fontFamily: "monospace", margin: "7px" }}>Sort by Date</small>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="row gap-3">
                <div className="col">
                    <h2>Pending</h2>
                    <ul className="list-group">
                        {filteredTasks.filter(task => task.status === "Pending").map((task, index) => (
                            <TaskItem
                                key={index}
                                task={task}
                                index={index}
                            />
                        ))}
                    </ul>
                </div>
                <div className="col">
                    <h2>In Progress</h2>
                    <ul className="list-group">
                        {filteredTasks.filter(task => task.status === "In Progress").map((task, index) => (
                            <TaskItem
                                key={index}
                                task={task}
                                index={index}
                            />
                        ))}
                    </ul>
                </div>
                <div className="col">
                    <h2>Completed</h2>
                    <ul className="list-group">
                        {!isHidden && filteredTasks.filter(task => task.status === "Completed").map((task, index) => (
                            <TaskItem
                                key={index}
                                task={task}
                                index={index}
                            />
                        ))}
                    </ul>
                </div>
                <div className="col">
                    <h2>Canceled</h2>
                    <ul className="list-group">
                        {!isHidden && filteredTasks.filter(task => task.status === "Canceled").map((task, index) => (
                            <TaskItem
                                key={index}
                                task={task}
                                index={index}
                            />
                        ))}
                    </ul>
                </div>
            </div>

            <FloatButton.Group
                shape="circle"
                icon={<EllipsisOutlined />}
            >
                <FloatButton tooltip="Hide/Show Completed and Canceled Tasks" onClick={hideShowCompletedAndCanceled} icon={<EyeOutlined />} />
                <FloatButton tooltip="Send to Completed" onClick={() => moveSelectedTasks("Completed")} icon={<CheckCircleOutlined />} />
                <FloatButton tooltip="Send to In Progress" onClick={() => moveSelectedTasks("In Progress")} icon={<ClockCircleOutlined />} />
                <FloatButton tooltip="Send to Canceled" onClick={() => moveSelectedTasks("Canceled")} icon={<StopOutlined />} />
            </FloatButton.Group>
        </>
    );
}
