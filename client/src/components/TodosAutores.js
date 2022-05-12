import React,{useState,useEffect} from "react";
import{Link} from "react-router-dom";
import axios from 'axios';

const TodosAutores = () =>{
    
    const [autores, setAutores] = useState([]);

    useEffect(()=>{

        axios.get("http://localhost:8000/api/autores")
            .then(res=>{
                setAutores(res.data);
            })
            .catch(err=> console.log(err))
    },[])

    const borrarAutor = (idAutor) =>{
        axios.delete("http://localhost:8000/api/autores/"+idAutor)
        .then(res =>{
            let nuevaLista = autores.filter(autor => autor._id !== idAutor)
            setAutores(nuevaLista);
        })
    }

    return(
        <div>
            <h1>Autores Favoritos</h1>
            <Link className="btn btn-success" to="/nuevo">nuevo autor</Link>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Autores</th>
                        <th>imagen</th>
                        <th>libros</th>
                        <th>articulos</th>
                        <th>novelagrafica</th>
                        <th>cuentos</th>
                        <th>Fecha de creacion</th>
                        
                        <th>Acciones</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        autores.map((autor,index)=>(
                            <tr key={index}>
                                <td>{autor.nombre}</td>
                                <td><img className="img-fluid" src={autor.imagen}/></td>
                                <td>{autor.libros ? <span className="glyphicon glyphicon-ok text-success"></span> : <span className="glyphicon glyphicon-remove text-danger"></span>}</td>
                                <td>{autor.articulos ? <span className="glyphicon glyphicon-ok text-success"></span> : <span className="glyphicon glyphicon-remove text-danger"></span>}</td>
                                <td>{autor.novelagrafica ? <span className="glyphicon glyphicon-ok text-success"></span> : <span className="glyphicon glyphicon-remove text-danger"></span>}</td>
                                <td>{autor.cuentos ? <span className="glyphicon glyphicon-ok text-success"></span> : <span className="glyphicon glyphicon-remove text-danger"></span>}</td>
                                <td>{autor.createdAt}</td>
                                <td>{autor.articulos}</td>

                                <td>
                                    <Link className="btn btn-primary" to={`/autor/editar/${autor._id}`}>Editar</Link>
                                    <button className="btn btn-danger" onClick={()=>borrarAutor(autor._id)} >Eliminar</button>
                                </td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
        </div>
    )

}

export default TodosAutores;



