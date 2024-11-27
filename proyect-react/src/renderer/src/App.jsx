import { HashRouter, Route, Routes } from 'react-router-dom'

import { useState } from "react";

import CreateView from "./components/CreateView";
import CreateElement from "./components/CreateElement";

export default function App() {

    const [tasks, setTasks] = useState([]);
    const [originalTasks, setOriginalTasks] = useState([]); // Lista completa original
    const [filteredTasks, setFilteredTasks] = useState([]); // Lista filtrada
    const [isHidden, setIsHidden] = useState(false); // Mostrar/ocultar Completadas y Canceladas
// sdfdsfsd

    return (

        <>

            <HashRouter>

                <Routes>
                    <Route path="/" element={<CreateElement tasks={tasks} setTasks={setTasks} originalTasks={originalTasks} setOriginalTasks={setOriginalTasks} filteredTasks={filteredTasks} setFilteredTasks={setFilteredTasks} isHidden={isHidden} setIsHidden={setIsHidden}/>}></Route>
                    <Route path="/createTask" element={<CreateView tasks={tasks} setTasks={setTasks} setFilteredTasks={setFilteredTasks}/>}></Route>
                    <Route path='/editView/:itemId'></Route>
                </Routes>

            </HashRouter>

        </>

    );
}
