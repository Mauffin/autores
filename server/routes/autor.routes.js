const AutorController = require("../controllers/autor.controllers");

const UserController = require('../controllers/user.cotrollers');

const{authenticate } =require("../config/jwt.config");

    module.exports = (app)=>{
        app.post("/api/autores",authenticate,AutorController.create_autor);
        app.get("/api/autores",authenticate,AutorController.get_all);
        app.get("/api/autores/:id",authenticate,AutorController.get_autor);
        app.put("/api/autores/:id",authenticate,AutorController.update_autor);
        app.delete("/api/autores/:id",authenticate,AutorController.delete_autor);

        app.post("/api/register",UserController.register); //ruta del registro de usuario

        app.post("/api/login",UserController.login);

    }