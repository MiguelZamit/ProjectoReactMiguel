import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditView({ tasks, setTasks, handleDeleteEdit, setFilteredTasks }) {
    const navigate = useNavigate();
    const { itemId } = useParams();
    const itemIdToNumeric = Number(itemId); // Asegúrate de que el ID se corresponda con el objeto de la tarea

    const [taskDetails, setTaskDetails] = useState({
        name: "",
        description: "",
        status: "Pending",
        deadline: "",
    });

    const [unsavedChanges, setUnsavedChanges] = useState(false); // Cambiar la variable 'change' a un estado


    // Precargar los datos de la tarea cuando se monta el componente
    useEffect(() => {
        const task = tasks.find((task) => task.id === itemIdToNumeric);
        if (task) {
            setTaskDetails({
                name: task.name || "",
                description: task.description || "",
                status: task.status || "Pending",
                deadline: task.deadline || "",
            });
        }
    }, [itemIdToNumeric, tasks]);

    function handleSave() {
        const newTitle = document.getElementById("iptTitle").value;
        const newDescription = document.getElementById("iptDescription").value;
        const newStatus = document.getElementById("iptStatus").value;
        const newDeadline = document.getElementById("iptDeadline").value;

        // Crear el objeto actualizado
        const updatedTask = {
            name: newTitle,
            description: newDescription,
            status: newStatus,
            deadline: newDeadline,
            isChecked: false,
            id: itemIdToNumeric,
            date: new Date().toISOString(),
        };

        // Actualizar la lista de tareas
        const taskListUpdated = tasks.map((task) =>
            task.id === itemIdToNumeric ? updatedTask : task
        );

        setTasks(taskListUpdated);
        setFilteredTasks(taskListUpdated); // Actualiza las tareas filtradas

        // Actualizar en la base de datos
        window.api.updateTask(updatedTask);

        console.log("Tarea actualizada:", updatedTask);

        // Navegar de vuelta al inicio
        navigate("/");
    }

    async function handleDeleteAndExit() {
        const taskToDelete = tasks.find((task) => task.id === itemIdToNumeric);

        console.log(itemIdToNumeric);
        await handleDeleteEdit(itemIdToNumeric); // Llamada para eliminar la tarea

        window.api.deleteTask(taskToDelete);
        console.log("En teoría borrado de la base de datos");

        navigate("/"); // Redirigir al inicio
    }


    // No se como optimizar esto
    function handleChangeName(e) {

        setTaskDetails({ ...taskDetails, name: e.target.value })
        unsavedChange()

    }

    function handleChangeDescription(e) {

        setTaskDetails({ ...taskDetails, description: e.target.value })
        unsavedChange()

    }

    function handleChangeStatus(e) {

        setTaskDetails({ ...taskDetails, status: e.target.value })
        unsavedChange()

    }

    function handleChangeDeadline(e) {

        setTaskDetails({ ...taskDetails, deadline: e.target.value })
        unsavedChange()

    }

    function unsavedChange() {
        setUnsavedChanges(true)
    }

    

    function handleBack() {

        console.log(unsavedChanges);
        

        if (!unsavedChanges) {

            navigate("/") // Volvemos si no ha cambiado nada

        } else {
            window.api
                .openEditConfirmationDialog(
                    `Task ${itemId} has unsaved changes. Do you want to go back to the home page?`
                )
                .then((value) => {
                    if (value.response === 0) {
                        handleSave(); // Guardar antes de volver
                    } else if (value.response === 1) {
                        navigate("/"); // Volver sin guardar
                    }
                });

                setUnsavedChanges(false)
        }


    }


    

    

    return (
        <>
            <h1>This is the edit view with the element number {itemId}</h1>

            <div className="d-flex container-fluid align-items-center justify-content-center form-validation" id="container">
                <form className="m-5" id="login">
                    <div className="input-group mb-3">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="iptTitle"
                                name="title"
                                placeholder="Example: Clean the car..."
                                value={taskDetails.name} // Vinculamos el valor al estado
                                onChange={(e) => handleChangeName(e)}
                                required
                            />
                            <label>Title</label>
                        </div>

                        <div className="form-floating">
                            <textarea
                                id="iptDescription"
                                name="description"
                                placeholder="Write anything you want..."
                                value={taskDetails.description} // Vinculamos el valor al estado
                                onChange={(e) => handleChangeDescription(e)}
                            ></textarea>
                        </div>

                        <select
                            name="status"
                            id="iptStatus"
                            value={taskDetails.status} // Vinculamos el valor al estado
                            onChange={(e) => handleChangeStatus(e)}
                            required
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Canceled">Canceled</option>
                        </select>
                        <label>Status</label>

                        <input
                            type="date"
                            id="iptDeadline"
                            name="deadline"
                            value={taskDetails.deadline} // Vinculamos el valor al estado
                            onChange={(e) => handleChangeDeadline(e)}
                        />
                        <label>Deadline</label>
                    </div>
                </form>
                <button type="button" onClick={handleDeleteAndExit}>Delete</button>
                <button type="button" onClick={handleSave}>Save</button>
                <button type="button" onClick={handleBack}>Back</button>
            </div>
        </>
    );
}
