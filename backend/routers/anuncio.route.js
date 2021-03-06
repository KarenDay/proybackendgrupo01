const anuncioCtrl = require("./../controllers/anuncio.controller");

const autCtrl = require('./../controllers/auth.controller');

const express = require("express");
const router = express.Router();


router.get("/", anuncioCtrl.obtenerAnuncios);
router.get("/busquedaRangoFecha", anuncioCtrl.anunciosPorFechas);
router.get("/busquedaAvanzada", anuncioCtrl.busquedaDatosCombinadaPlus);
router.post("/", anuncioCtrl.crearAnuncio);
router.get("/:id", anuncioCtrl.getAnuncio);
router.put("/:id", anuncioCtrl.editarAnuncio);
router.delete("/eliminar/:idAnuncio", anuncioCtrl.eliminarAnuncio);
router.get("/filtro/area", anuncioCtrl.getAnunciosPorArea);
router.get("/filtro/redactor", anuncioCtrl.getAnunciosPorRedactor);
router.get("/filtro/areaYestado", anuncioCtrl.getAnunciosPorAreaYEstado);
router.get("/filtro/rol", anuncioCtrl.getAnunciosPorRol);
module.exports = router;

