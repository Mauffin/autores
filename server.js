const express = require("express");
const cors = require("cors");
const app = express();


app.use( express.json(), express.urlencoded({ extended: true }) );

app.use(
    cors({
        origin:"http://localhost:3000"
    })
)

//iniciamos DB
require("./server/config/mongoose.config");

//importamos rutas
const misRutas = require ("./server/routes/autor.routes");
misRutas(app);

//ejecutamos server
app.listen(8000,()=>console.log("Servidor Listo!!"));