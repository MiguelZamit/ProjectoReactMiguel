import { HashRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react";

import CreateView from "./components/CreateView";
import CreateElement from "./components/CreateElement";
import EditView from './components/EditView';

export default function App() {
    // Estados principales
    const [tasks, setTasks] = useState([]); // Lista actual de tareas
    const [originalTasks, setOriginalTasks] = useState([]); // Lista completa original
    const [filteredTasks, setFilteredTasks] = useState([]); // Lista filtrada
    const [isHidden, setIsHidden] = useState(false); // Mostrar/ocultar tareas Completadas y Canceladas
    const [ids, setIds] = useState([]); // Estado para ID específico // ULTIMO CAMBIADO AQUI DE ENTEROS A LISTA DE ENTEROS

    // Función para cargar las tareas desde la base de datos al iniciar
    useEffect(() => {
        const fetchTasks = async () => {
            const tasksFromDB = await window.api.getTasks(); // Llamada asíncrona
            setTasks(tasksFromDB);
            setOriginalTasks(tasksFromDB);
            setFilteredTasks(tasksFromDB); // Inicializa también la lista filtrada
        };

        fetchTasks(); // Llamamos a la función
    }, []); // Se ejecuta una sola vez al montar el componente


    async function handleDelete(taskId) {
        const taskToDelete = tasks.find((task) => task.id === taskId);
    
        if (!taskToDelete) {
            console.log("Tarea no encontrada");
            return;
        }
    
        const confirmed = await window.api.openConfirmationDialog(
            taskToDelete.name,
            "Are you sure you want to delete this item?"
        );
    
        if (confirmed) {
            const newList = tasks.filter((task) => task.id !== taskId);
            setTasks(newList);
            setOriginalTasks(newList);
            setFilteredTasks(newList);
        }
    }
    


    // Función para eliminar tareas desde la vista de edición
    async function handleDeleteEdit(taskId) {
        const taskToDelete = tasks.find(task => task.id === taskId);

        tasks.forEach((ele) => {

            console.log(ele)

        })

        if (!taskToDelete) {

            console.log("Nada que borrar")
            return;
        }

        const confirmed = await window.api.openConfirmationDialog(
            taskToDelete.name,
            'Are you sure you want to delete this item?'
        );

        if (confirmed) {
            const newList = tasks.filter(task => task.id !== taskId);
            setTasks(newList);
            setOriginalTasks(newList);
            setFilteredTasks(newList);
        }
    }


    return (
        <HashRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <CreateElement
                            tasks={tasks}
                            setTasks={setTasks}
                            originalTasks={originalTasks}
                            setOriginalTasks={setOriginalTasks}
                            filteredTasks={filteredTasks}
                            setFilteredTasks={setFilteredTasks}
                            isHidden={isHidden}
                            setIsHidden={setIsHidden}
                            handleDelete={handleDelete}
                        />
                    }
                />
                <Route
                    path="/createTask"
                    element={
                        <CreateView
                            tasks={tasks}
                            setTasks={setTasks}
                            setFilteredTasks={setFilteredTasks}
                            setIds={setIds}
                            ids={ids}
                        />
                    }
                />
                <Route
                    path="/editView/:itemId"
                    element={
                        <EditView
                            tasks={tasks}
                            setTasks={setTasks}
                            handleDeleteEdit={handleDeleteEdit}
                            ids={ids}
                            setFilteredTasks={setFilteredTasks}
                        />
                    }
                />
            </Routes>
        </HashRouter>
    );
}
