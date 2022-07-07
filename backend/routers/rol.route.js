const rolCtrl = require("./../controllers/rol.controller");

const autCtrl = require('./../controllers/auth.controller');


const express = require("express");
const router = express.Router();

router.get("/", rolCtrl.obtenerRoles);
router.get("/nombre" , rolCtrl.obtenerRolPorNombre);
router.get("/repetido/:nombreRol" , autCtrl.verifyToken, rolCtrl.buscarRepetidoPorNombre);
router.post("/", rolCtrl.crearRol);
router.get("/:id",  rolCtrl.getRol);
router.put("/:id", autCtrl.verifyToken, rolCtrl.editarRol);
router.delete("/eliminar/:idRol", autCtrl.verifyToken, rolCtrl.eliminarRol);

module.exports = router;