const Anuncio = require("../models/anuncio");
const anuncioCtrl = {};
//const qrcode= require('qrcode');
/**
 * Recupera todos los Anuncios
 */
anuncioCtrl.obtenerAnuncios = async (req, res) => {
  var anuncios = await Anuncio.find()
  .populate("redactor")
  .populate("mediosDePublicacion")
  .populate("destinatario")
  .populate('area');
  
  res.json(anuncios);
};

/* anuncioCtrl.generarCodigoQR = async(req,res)=>{
  var url = req.query.url;
  const qr = await  qrcode.toDataURL(url);
  res.json({
    status:"1",
    msg:"codigo qr creado correctamente",
    codigoqr: qr
  })
} */

/**
 * Agregar un nuevo Anuncio
 */
anuncioCtrl.crearAnuncio = async (req, res) => {
  var anuncio = new Anuncio(req.body);
  console.log(req.body);
  try {
    await anuncio.save();
    res.json({
      status: "1",
      msg: "Anuncio agregado Exitosamente",
    });
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: "Error al agregar Anuncio",
    });
  }
};
/**
 * Obtener un Anuncio en especifico
 */
 anuncioCtrl.getAnuncio = async (req, res) => {
  const anuncio = await Anuncio.findById(req.params.id)
  .populate('mediosDePublicacion')
  .populate('destinatario')
  .populate('redactor')
  .populate('area');
  res.json(anuncio);
};

/**
 * Actualizar un Anuncio
 */
anuncioCtrl.editarAnuncio = async (req, res) => {
  const vanuncio = new Anuncio(req.body);
  try {
    await Anuncio.updateOne({ _id: req.body._id }, vanuncio);
    res.json({
      status: "1",
      msg: "Anuncio Actualizado",
    });
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: "Error procesando la operacion - Actualizar",
    });
  }
};
/**
 * Eliminar un Anuncio
 */
anuncioCtrl.eliminarAnuncio = async (req, res) => {
  try {
    await Anuncio.deleteOne({ _id: req.params.idAnuncio });
    res.json({
      status: "1",
      msg: "Anuncio Eliminado",
    });
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: "Error procesando la operacion - Eliminar",
    });
  }
};

anuncioCtrl.getAnunciosPorArea  = async (req, res) => {
  var estado= "CONFECCIONADO"
  var anuncio =  await Anuncio.find({area:{$eq:req.query.area}})
  .populate("redactor")
  .populate("mediosDePublicacion")
  .populate("destinatario")
  .populate('area');
  res.json(anuncio);
}

anuncioCtrl.getAnunciosPorAreaYEstado  = async (req, res) => {
  var estado= "CONFECCIONADO"
  var anuncio =  await Anuncio.find({$and:[
                                      {area:{$eq:req.query.area}},
                                      {estado:{$eq:estado}}
                                  ]})
  .populate("redactor")
  .populate("mediosDePublicacion")
  .populate("destinatario")
  .populate('area');
  res.json(anuncio);
}


anuncioCtrl.getAnunciosPorRedactor  = async (req, res) => {
    
  var anuncio =  await Anuncio.find({redactor:{$eq:req.query.redactor}})
  .populate("redactor")
  .populate("mediosDePublicacion")
  .populate("destinatario")
  .populate('area');
  res.json(anuncio);
}

anuncioCtrl.getAnunciosPorRol  = async (req, res) => {
    
  var anuncio =  await Anuncio.find({destinatario:{$eq:req.query.rol}})
  .populate("redactor")
  .populate("mediosDePublicacion")
  .populate("destinatario")
  .populate('area');
  res.json(anuncio);
}

module.exports = anuncioCtrl;
