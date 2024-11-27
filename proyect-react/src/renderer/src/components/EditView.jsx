import { useNavigate, useParams } from "react-router-dom"
// El use params me servira para coger el id que enviamos desde el CreateView


export default function EditView({tasks, setTasks, handleDeleteEdit, id}) { // Si no va mirar lo de filteredTasks

    const navigate = useNavigate()
    const {itemId} = useParams() 
    const itemIdToNumeric = Number(itemId) + id // Mas uno para que se empareje con el id del objeto task ya que itemId empieza por 0

    // Para un futuro cojer el objecto buscandolo en el array para poner en el titulo el nombre en vez del numero
    function getTask() {
        
        const task = tasks.find(task => task.id === itemIdToNumeric)
        console.log(task)
        return task

    }

    function handleSave() {
        
    }

    async function handleDeleteAndExit() {
        
        const taskToDelete = getTask()

        await handleDeleteEdit(taskToDelete.id)
        navigate("/")

    }

    function handleBack() {
        
        // De momento no funciona
        window.api.openEditConfirmationDialog(

            `Task ${itemId} have an unsaved changes. Do you want come back to the home page?`
        ).then((value) => {
         

                if (value.response === 0){

                    // Le ha dado a si. Logica para guardar cambios


                }else if (value.response === 1){

                    // Se descarta la edicion
                    navigate("/")
                    

                }else{

                    return // No hacesmos nada. Si no funciona, Quitamos este else

                }

            })

        

    }

    return (

        <>
            <h1>This is the edit view with the element number {itemId}</h1>

            <div className="d-flex container-fluid align-items-center justify-content-center form-validation" id="container">
                <form className="m-5" id="login" >
                    <div className="input-group mb-3">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="iptTitle"
                                name="title"
                                placeholder="Example: Clean the car..."
                                required
                            />
                            <label>Title</label>
                        </div>

                        <div className="form-floating">
                            <textarea
                                id="iptDescription"
                                name="description"
                                placeholder="Write anything you want..."
                            ></textarea>
                        </div>

                        <select
                            name="status"
                            id="iptStatus"
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
                        />
                        <label>Deadline</label>
                    </div>

                   
                </form>
            </div>

        

            <button type="button" onClick={handleDeleteAndExit}>Delete</button>
            <button type="button" onClick={handleSave}>Save</button>
            <button type="button" onClick={handleBack}>Back</button>

            {/* <button onClick={() => navigate('/')} type="button" >Return</button> */}
        </>


    )

}