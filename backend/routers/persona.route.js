const personaCtrl = require('./../controllers/persona.controller');

const autCtrl = require('./../controllers/auth.controller');


const express = require('express');
const router = express.Router();

//router.get('/filtro/encargados', personaCtrl.getEncargados);//no se utiliza
router.get('/', autCtrl.verifyToken, personaCtrl.getPersonas);
router.post('/', autCtrl.verifyToken, personaCtrl.createPersona);
router.get('/getpersona', autCtrl.verifyToken, personaCtrl.getPersona);
router.put('/update', autCtrl.verifyToken, personaCtrl.editPersona);
router.delete('/delete', autCtrl.verifyToken, personaCtrl.deletePersona);
router.put('/addRol', autCtrl.verifyToken, personaCtrl.addRol);
router.delete('/deleteRol', autCtrl.verifyToken, personaCtrl.deleteRol); 
router.get('/filtro/dni', autCtrl.verifyToken, personaCtrl.getPersonaByDni);
router.get('/busquedaCombinada', autCtrl.verifyToken, personaCtrl.busquedaCombinada);

module.exports = router;