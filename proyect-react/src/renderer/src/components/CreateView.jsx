import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

// Usare tambien aqui filtered tasks para porque es la que uso en CreateElement porque sino buscara en una lista vacia
export default function CreateView({ tasks, setTasks, setFilteredTasks }) {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        title: "",
        description: "",
        status: "Pending",
        deadline: "",
    });

    // Maneja cambios en los campos del formulario
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    function handleCreateTask(event) {
        event.preventDefault();

        let { deadline } = formValues;

        // Si no se establece una fecha límite, definirla como 7 días después de hoy
        if (!deadline) {
            const newDeadline = new Date();
            newDeadline.setDate(newDeadline.getDate() + 7);
            deadline = newDeadline.toISOString().split("T")[0]; // Fecha en formato YYYY-MM-DD
        }

        const newTask = {
            name: formValues.title,
            description: formValues.description,
            status: formValues.status,
            deadline,
            isChecked: false,
            id: uuidv4(),
            date: new Date().toISOString(),
        };

        // Actualizar el estado de las tareas
        const newList = [...tasks, newTask];
        setTasks(newList);
        setFilteredTasks(newList)


        // Navegar de vuelta a la vista principal
        navigate("/");
    }

    async function handleDiscard() {
        const { title } = formValues;

        window.api
            .openDiscardDialog(
                title,
                "Are you sure you want to discard this item?"
            )
            .then((confirmed) => {
                if (confirmed) {
                    navigate("/");
                }
            });
    }

    return (
        <>
            <h1>This is the creation view</h1>

            <div className="d-flex container-fluid align-items-center justify-content-center form-validation" id="container">
                <form className="m-5" id="login" onSubmit={handleCreateTask}>
                    <div className="input-group mb-3">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="iptTitle"
                                name="title"
                                placeholder="Example: Clean the car..."
                                value={formValues.title}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Title</label>
                        </div>

                        <div className="form-floating">
                            <textarea
                                id="iptDescription"
                                name="description"
                                placeholder="Write anything you want..."
                                value={formValues.description}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>

                        <select
                            name="status"
                            id="iptStatus"
                            value={formValues.status}
                            onChange={handleInputChange}
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
                            value={formValues.deadline}
                            onChange={handleInputChange}
                        />
                        <label>Deadline</label>
                    </div>

                    <div className="d-flex align-items-center justify-content-center">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            <div className="d-flex align-items-center justify-content-center">
                <button type="button" className="btn btn-primary" onClick={handleDiscard}>
                    Discard
                </button>
            </div>
        </>
    );
}
