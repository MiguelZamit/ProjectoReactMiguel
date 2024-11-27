import { HashRouter, Route, Routes } from 'react-router-dom'

import { useState } from "react";

import CreateView from "./components/CreateView";
import CreateElement from "./components/CreateElement";
import EditView from './components/EditView';

export default function App() {

    const [tasks, setTasks] = useState([]);
    const [originalTasks, setOriginalTasks] = useState([]); // Lista completa original
    const [filteredTasks, setFilteredTasks] = useState([]); // Lista filtrada
    const [isHidden, setIsHidden] = useState(false); // Mostrar/ocultar Completadas y Canceladas
    const [id, setId] = useState(0) // Necesito este estado para llevarmelo a diferentes componentes
// sdfdsfsd


    async function handleDelete(index) {
        await window.api.openConfirmationDialog( 
            tasks[index].name,  // Aquí accedes a la propiedad 'name' usando el índice correcto
            'Are you sure you want to delete this item?'
        )
        .then((confirmed) => {
            if (confirmed) {
                // Eliminar la tarea del estado original y filtrado
                const newList = tasks.filter((_value, i) => i !== index);
                setTasks(newList);
                setOriginalTasks(newList);  // Asegurarse de que la lista original también se actualice
                setFilteredTasks(newList);  // Asegurarse de que el filtro también se actualice
            }
        });
    }


    async function handleDeleteEdit(taskId) {
        const taskToDelete = tasks.find(task => task.id === taskId);
        if (!taskToDelete) return;
    
        await window.api.openConfirmationDialog(
            taskToDelete.name,
            'Are you sure you want to delete this item?'
        ).then((confirmed) => {
            if (confirmed) {
                const newList = tasks.filter(task => task.id !== taskId);
                setTasks(newList);
                setOriginalTasks(newList);
                setFilteredTasks(newList);
            }
        });
    }
    


    return (

        <>

            <HashRouter>

                <Routes>
                    <Route path="/" element={<CreateElement tasks={tasks} setTasks={setTasks} originalTasks={originalTasks} setOriginalTasks={setOriginalTasks} filteredTasks={filteredTasks} setFilteredTasks={setFilteredTasks} isHidden={isHidden} setIsHidden={setIsHidden} handleDelete={handleDelete}/>}></Route>
                    <Route path="/createTask" element={<CreateView tasks={tasks} setTasks={setTasks} setFilteredTasks={setFilteredTasks} setId={setId}/>}></Route>
                    <Route path='/editView/:itemId' element={<EditView tasks={tasks} setTasks={setTasks} handleDeleteEdit={handleDeleteEdit} id={id}></EditView>}></Route>
                </Routes>

            </HashRouter>

        </>

    );
}
