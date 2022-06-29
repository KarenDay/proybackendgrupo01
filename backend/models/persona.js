const mongoose = require ('mongoose');
const {Schema} = mongoose;
const Area = require ('./area');
const PersonaSchema = new Schema({
    apellido: {type: String, required: true},
    nombre: {type: String, required: true},
    legajo: {type: String, required: true},
    dni: {type: Number, required: true}, 
    email: {type: String, required: true},
    area: {type: Schema.Types.ObjectId, ref: Area, required: false},
    roles: [{type: mongoose.Types.ObjectId, ref: 'Rol'}]
    })
module.exports = mongoose.models.Persona || mongoose.model('Persona', PersonaSchema);