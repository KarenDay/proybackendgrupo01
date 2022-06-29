const mongoose = require("mongoose");
const {Schema} = mongoose;
const Persona =require ('./persona');
const Rol =require ('./rol');
const UsuarioSchema = new Schema({
username: {type: String, required: true},
password: {type:String, required:true},
persona:{ type: mongoose.Types.ObjectId, ref: 'Persona', required: false},
rol: {type: Rol.schema} //ADMINISTRADOR- ENCARGADO ETC
});

module.exports = mongoose.model('Usuario', UsuarioSchema);