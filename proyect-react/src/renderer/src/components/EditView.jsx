import { useNavigate, useParams } from "react-router-dom"
// El use params me servira para coger el id que enviamos desde el CreateView


export default function EditView() {

    const navigate = useNavigate()

    return (

        <>
            <h1>This is the edit view</h1>
            <button onClick={() => navigate('/')} type="button" >Return</button>
        </>


    )

}