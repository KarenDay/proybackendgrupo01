const Medio = require("../models/medio");
const medioCtrl = {};

/**
 * Recupera todos los Medios
 */
medioCtrl.obtenerMedios = async (req, res) => {
  var medios = await Medio.find();
  res.json(medios);
};

/**
 * Agregar un nuevo Medio
 */
 medioCtrl.crearMedio = async (req, res) => {
  var medio = new Medio(req.body);
  const medioEncontrado = await Medio.findOne({nombreMedio:{$eq:req.body.nombreMedio}});
    if (medioEncontrado==null || medioEncontrado=="" || medioEncontrado==undefined) {
      try {
        await medio.save();
        res.json({
          status: "1",
          msg: "Medio agregado Exitosamente",
        });
      } catch (error) {
        res.status(400).json({
          status: "0",
          msg: "Error al agregar Medio",
        });
      }
    }else{
      res.json({
          status:"2",
          msg:"Ya se encuentra un medio registrado con ese nombre"
      })
  }
};
/**
 * Obtener un Medio en especifico
 */
 medioCtrl.getMedio = async (req, res) => {
  const medio = await Medio.findById(req.params.id);
  res.json(medio);
};

/**
 * Actualizar un Medio
 */
 medioCtrl.editarMedio = async (req, res) => {
  const vmedio = new Medio(req.body);
  const medioEncontrado = await Medio.findOne({nombreMedio:{$eq:req.body.nombreMedio}});
    if (medioEncontrado==null || medioEncontrado=="" || medioEncontrado==undefined) {
        try {
          await Medio.updateOne({ _id: req.body._id }, vmedio);
          res.json({
            status: "1",
            msg: "Medio Actualizado",
          });
        } catch (error) {
          res.status(400).json({
            status: "0",
            msg: "Error procesando la operacion - Actualizar",
          });
        }
      }else{
        res.json({
            status:"2",
            msg:"Ya se encuentra un medio registrado con ese nombre"
        })
    }
};

/**
 * Eliminar un Medio
 */
medioCtrl.eliminarMedio = async (req, res) => {
  try {
    await Medio.deleteOne({ _id: req.params.idMedio });
    res.json({
      status: "1",
      msg: "Medio Eliminado",
    });
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: "Error procesando la operacion - Eliminar",
    });
  }
};

module.exports = medioCtrl;
