const mongoose = require("mongoose");

const EsquemaAutor = new mongoose.Schema({
    nombre:{
        type: String,
        required:[true, "nombre es obligatorio"],
        minlength:[2,"nombre debe tener almenos 2 caracteres"],
        unique:[true, "el autor ya esta dado de alta."]
    },
    imagen: String,
    libros:{
        type:Boolean,
        default:false
    },
    articulos:{
        type:Boolean,
        default:false
    },
    cuentos:{
        type:Boolean,
        default:false
    },
    novelagrafica:{
        type:Boolean,
        default:false
    }

},{timestamps:true, versionKey:false})

const Autor = mongoose.model("autores",EsquemaAutor);
module.exports = Autor;