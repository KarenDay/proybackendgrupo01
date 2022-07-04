const personaCtrl = require('./../controllers/persona.controller');

const express = require('express');
const router = express.Router();

//router.get('/filtro/encargados', personaCtrl.getEncargados);//no se utiliza
router.get('/',personaCtrl.getPersonas);
router.post('/', personaCtrl.createPersona);
router.get('/getpersona', personaCtrl.getPersona);
router.put('/update', personaCtrl.editPersona);
router.delete('/delete', personaCtrl.deletePersona);
router.put('/addRol',personaCtrl.addRol);
router.delete('/deleteRol',personaCtrl.deleteRol); 
router.get('/filtro/dni', personaCtrl.getPersonaByDni);
router.get('/busquedaCombinada',personaCtrl.busquedaCombinada);

module.exports = router;