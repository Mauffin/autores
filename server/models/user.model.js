const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const EsquemaUsuario = new mongoose.Schema({

    firstName:{type:String,
        require:[true,"nombre obligatorio"]},
    lastName:{
        type:String,
        require:[true,"apellido obligatorio"]
    },
    email:{
        type:String,
        required:[true,"Email obligatorio"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message:"ingrese Email valido"
        },
        unique:true
    },
    password:{
        type:String,
        required:[true,"password obligatorio"],
        minLength:[8,"password debe tener almenos 8 caracteres"]
    }
},{timestamps:true, versionKey:false})

// Se realiza cuando no queremos guardar en BD
EsquemaUsuario.virtual('confirmPassword')
        .get(()=>this._confirmPassword)
        .set(value => this._confirmPassword = value)

//Se hace antes de validar el esquema usuario
EsquemaUsuario.pre('validate', function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'las password no coinciden');
    }

    next();
})


//Antes de guardar usuario guardamos contrasena

EsquemaUsuario.pre('save', function(next){
    bcrypt.hash(this.password,10)
        .then(hash => {
            this.password = hash;
            next();
        })
});

const Usuario = mongoose.model("usuario", EsquemaUsuario);
module.exports = Usuario;
