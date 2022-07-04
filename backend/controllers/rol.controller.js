const Rol = require("../models/rol");
const rolCtrl = {};

/**
 * Recupera todos los Roles disponibles
 */
rolCtrl.obtenerRoles = async (req, res) => {
  var roles = await Rol.find().populate('personas');
  res.json(roles);
};

/**
 * Agregar un nuevo Rol
 */
rolCtrl.crearRol = async (req, res) => {
  var rol = new Rol(req.body);
  const rolEncontrado = await Rol.findOne({nombreRol:{$eq:req.body.nombreRol}});
    if (rolEncontrado==null || rolEncontrado=="" || rolEncontrado==undefined) {
          try {
            await rol.save();
            res.json({
              status: "1",
              msg: "Rol agregado Exitosamente",
            });
          } catch (error) {
            res.status(400).json({
              status: "0",
              msg: "Error al agregar Rol",
            });
          }
    }else{
      res.json({
          status:"2",
          msg:"Ya se encuentra un rol registrado con ese nombre"
      })
  }
};
/**
 * Obtener un Rol en especifico
 */
 rolCtrl.getRol = async (req, res) => {
  const rol = await Rol.findById(req.params.id);
  res.json(rol);
};
/**
 * Actualizar un Rol
 */
rolCtrl.editarRol = async (req, res) => {
  const bodyRol = new Rol(req.body);
  const rolEncontrado = await Rol.findOne({nombreRol:{$eq:req.body.nombreRol}});
    if (rolEncontrado==null || rolEncontrado=="" || rolEncontrado==undefined) {
        try {
          await Rol.updateOne({ _id: req.body._id }, bodyRol);
          res.json({
            status: "1",
            msg: "Rol Actualizado",
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
            msg:"Ya se encuentra un rol registrado con ese nombre"
        })
    }
};
/**
 * Eliminar un Rol
 */
rolCtrl.eliminarRol = async (req, res) => {
  try {
    await Rol.deleteOne({ _id: req.params.idRol });
    res.json({
      status: "1",
      msg: "Rol Eliminado",
    });
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: "Error procesando la operacion - Eliminar",
    });
  }
};

// METODOS DE BUSQUEDA
/**
 * Obtener Roles por nombre
 */
 rolCtrl.obtenerRolPorNombre = async (req, res) => {
  criteria = {};
  if (
    req.query.nombreRol != null &&
    req.query.nombreRol != ""
  ) {
    criteria.nombreRol = {
      $regex: req.query.nombreRol,
      $options: "i",
    };
  }
  const rol = await Rol.find(criteria);
  //console.log(rol);
  res.json(rol);
};


rolCtrl.buscarRepetidoPorNombre = async (req, res) => {
  criteria = {}
  if (req.query.nombreRol != null && req.query.nombreRol != "") {
    criteria.nombreRol = req.query.nombreRol ;
  }
  const rol = await Rol.findOne({ nombreRol: req.params.nombreRol });
  //const rol = await Rol.findOne({criteria });
  res.json(rol);
}

module.exports = rolCtrl;

/* rolCtrl.buscarRepetido = async (req, res) => {
  criteria = {};
  if (req.query.nombreRol != null && req.query.nombreRol != "") {
    criteria.nombreRol = req.query.nombreRol ;
  }
  const rol = await Rol.find(criteria);
  console.log(rol);
  console.log(rol.length);
  res.json(rol);
}; */

/**
 * if (req.query.nombreRol != null && req.query.nombreRol != "") {
    criteria.nombreRol =  req.query.nombreRol.toUpperCase() ;
  }
 */


