const medioCtrl = require("./../controllers/medio.controller");

const autCtrl = require('./../controllers/auth.controller');

const express = require("express");
const router = express.Router();

router.get("/", autCtrl.verifyToken,  medioCtrl.obtenerMedios);
router.post("/",  medioCtrl.crearMedio);
router.get("/:id", autCtrl.verifyToken,  medioCtrl.getMedio);
router.put("/:id", autCtrl.verifyToken,  medioCtrl.editarMedio);
router.delete("/eliminar/:idMedio", autCtrl.verifyToken,  medioCtrl.eliminarMedio);

module.exports = router;