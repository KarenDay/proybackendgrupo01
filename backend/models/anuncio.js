const mongoose = require("mongoose");
const { Schema } = mongoose;
const Medio = require("./medio");
const Rol = require("./rol");
const Persona = require("./persona");
const Area = require("./area");

const AnuncioSchema = new Schema({
  textoAnuncio: { type: String, required: true },
  tipoContenido: { type: String, required: true },
  fechaEntrega: { type: String, required: true },
  estado: { type: String, required: true },
  recursos: { type: String, required: true },
  tiempoLectura: { type: String, required: true },
  mediosDePublicacion: [{ type: Schema.Types.ObjectId, ref: Medio, required: true }],
  destinatario: [{ type: Schema.Types.ObjectId, ref: Rol, required: true }],
  redactor: { type: Schema.Types.ObjectId, ref: Persona, required: true },
  area: { type: Schema.Types.ObjectId, ref: Area, required: true }
  //area: [{type: Area.schema}],
  //roles: [{type: Rol.schema}]
});

module.exports =
  mongoose.models.Anuncio || mongoose.model("Anuncio", AnuncioSchema);
