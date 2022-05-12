const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/autores",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
    .then(()=>console.log("conectado con DB"))
    .catch(err =>console.log("error al conectarse con DB")+err);