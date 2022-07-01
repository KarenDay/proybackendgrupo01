const anuncioCtrl = require("./../controllers/anuncio.controller");

const express = require("express");
const router = express.Router();

router.get("/codigoqr",anuncioCtrl.generarCodigoQR);
router.get("/", anuncioCtrl.obtenerAnuncios);
router.post("/", anuncioCtrl.crearAnuncio);
router.get("/:id", anuncioCtrl.getAnuncio);
router.put("/:id", anuncioCtrl.editarAnuncio);
router.delete("/eliminar/:idAnuncio", anuncioCtrl.eliminarAnuncio);

module.exports = router;

