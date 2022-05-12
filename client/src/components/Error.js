import {Link} from "react-router-dom";

const Error = () =>{

    return(
        <div>
            <h1>No encontramos el autor, intat darlo de alta</h1>
            
            <Link to="/nuevo" className="btn btn-success">Crea un nuevo autor</Link>
        </div>
    )
}

export default Error;