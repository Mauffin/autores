const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');

app.use( express.json(), express.urlencoded({ extended: true }) );

//para usar cookies
app.use(cookieParser());

app.use(
    cors({
        origin:"http://localhost:3000",
        //credenciales
        credential:true
    })
)


//iniciamos DB
require("./server/config/mongoose.config");

//importamos rutas
const misRutas = require ("./server/routes/autor.routes");
misRutas(app);

//const rutaUsuari  =require (direccion de rutas de la carpeta de usuarios)
//rutaUsuario(app)

//ejecutamos server
app.listen(8000,()=>console.log("Servidor Listo!!"));