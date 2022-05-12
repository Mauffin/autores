const Usuario = require('../models/user.model');
const jwt =require("jsonwebtoken");
const secret_key = "Papas Fritas";
const bcrypt = require("bcrypt");

module.exports.register = (req, res) =>{
    const user = new Usuario(req.body);
    user.save()
        .then(usuario =>{
        

            const payload ={
                _id:user._id
            }
            //guardar al usuario en una cookie
            const myJWT = jwt.sign(payload, secret_key);

            res
                .cookie("usertoken", myJWT ,secret_key,{
                    httpOnly:true
                })
                .json(usuario)


        })
        .catch(err =>{
            console.log(err);
            res.status(400).json(err);
        })
}
module.exports.login = (req, res) =>{
    Usuario.findOne({email:req.body.email})
        .then(user =>{
            if(user === null){
                res.json({error:true, message:"el correo electronico es incorrecto"});
            }else{
                bcrypt.compare(req.body.password,user.password)
                    .then(passwordValid =>{
                        if(passwordValid){

                            const payload = {
                                _id: user._id
                            }

                            const myJWT = jwt.sign(payload,secret_key);

                            res
                                .cookie("usertoken",myJWT,secret_key,{
                                    httpOnly:true
                                })
                                .json({erro:false, message:"inicio de session correcto"})
                        }else{
                            res.json({error:true,message:"la contrasena es incorrecta"})
                        }
                    })
                    .catch(err=> res.json({error:true, message:"inicio de sesion invalido."}))
            }
        })
        .catch(err => res.json(err));
}

module.exports.logout = (req,res)=>{
    res.clearCookie('usertoken');
    res.status(200).json({message:"salimos de session"})
}