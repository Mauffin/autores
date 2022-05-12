import React,{useState,useEffect} from "react";
import axios from "axios";
import { useHistory,useParams,Link } from "react-router-dom";

const ActualizarAutor = () =>{

    const {id} = useParams();
    const [nombre,setNombre] = useState("");
    const [imagen,setImagen] = useState("");
    const[libros, setLibros] = useState(false);
    const [articulos, setArticulos] = useState(false);
    const [novelagrafica , setNovelagrafica] = useState(false);
    const [cuentos, setCuentos] = useState(false); 

    const [errors,setErrors]= useState({});
    const history = useHistory();

    useEffect(() =>{
        axios.get("http://localhost:8000/api/autores/"+id)
        .then(res =>{
            setNombre(res.data.nombre);
            setImagen(res.data.imagen);
            setLibros(res.data.libros);
            setArticulos(res.data.articulos);
            setNovelagrafica(res.data.novelagrafica);
            setCuentos(res.data.cuentos);
        })
        .catch(err => history.push("/error"));
    },[id,history])

    const actualizarAutor = e =>{
        e.preventDefault();
        
        axios.put("http://localhost:8000/api/autores/"+id,{
            nombre,
            imagen,
            libros,
            articulos,
            novelagrafica,
            cuentos
        })
        .then(res => history.push("/"))
        .catch (err=>setErrors(err.response.data.errors));
    }

    return(
        <div>
            <h1>Editar Autor</h1>
            <form onSubmit={actualizarAutor}>
                <div className="form-group">
                    <label htmlFor="nombre">nombre</label>
                    <input type="text" id="nombre" name="nombre" value={nombre} onChange={
                        (e) =>setNombre(e.target.value)} className="form-control"/>
                        {errors.nombre ? <span className="text-danger">{errors.nombre.message}</span>: null}
                </div>
                <div className="form-group">
                        <div className="row">
                            <div className="col-6">
                            <div className="form-group">
                                    <label htmlFor="imagen">URL imgaen</label>
                                    <input type="text" id="imagen" name="imagen" value={imagen} onChange={(e)=>setImagen(e.target.value)} className="form-control" />
                            </div>
                            </div>
                            <div className="col-6">
                                <img src={imagen}></img>
                            </div>
                        </div>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="libros"
                    name="libros" checked={libros} onChange={(e)=> setLibros(e.target.checked)}/>
                    <label className="form-check-label" htmlFor="libros">autor de libros</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="articulos"
                    name="articulos" checked={articulos} onChange={(e)=> setArticulos(e.target.checked)}/>
                    <label className="form-check-label" htmlFor="articulos">autor de articulos</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="novelagrafica"
                    name="novelagrafica" checked={novelagrafica} onChange={(e)=> setNovelagrafica(e.target.checked)}/>
                    <label className="form-check-label" htmlFor="novelagrafica">autor de novelagrafica</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="cuentos"
                    name="cuentos" checked={cuentos} onChange={(e)=> setCuentos(e.target.checked)}/>
                    <label className="form-check-label" htmlFor="cuentos">autor de cuentos</label>
                </div>
                
                <input type="submit" value="Guardar" className="btn btn-success"/>
                <Link className="btn btn-success" to="/">cancelar</Link>
                </form>
        </div>
    )

}
export default ActualizarAutor;