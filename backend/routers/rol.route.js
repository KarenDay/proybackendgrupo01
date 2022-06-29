const rolCtrl = require("./../controllers/rol.controller");

const express = require("express");
const router = express.Router();

router.get("/", rolCtrl.obtenerRoles);
router.get("/nombre" , rolCtrl.obtenerRolPorNombre);
router.get("/repetido/:nombreRol" , rolCtrl.buscarRepetidoPorNombre);
router.post("/", rolCtrl.crearRol);
router.get("/:id", rolCtrl.getRol);
router.put("/:id", rolCtrl.editarRol);
router.delete("/eliminar/:idRol", rolCtrl.eliminarRol);

module.exports = router;