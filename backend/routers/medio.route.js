const medioCtrl = require("./../controllers/medio.controller");

const express = require("express");
const router = express.Router();

router.get("/", medioCtrl.obtenerMedios);
router.post("/", medioCtrl.crearMedio);
router.get("/:id", medioCtrl.getMedio);
router.put("/:id", medioCtrl.editarMedio);
router.delete("/eliminar/:idMedio", medioCtrl.eliminarMedio);

module.exports = router;