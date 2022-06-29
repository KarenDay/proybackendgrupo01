const personaCtrl = require('./../controllers/persona.controller');

const express = require('express');
const router = express.Router();

router.get('/',personaCtrl.getPersonas);
router.post('/', personaCtrl.createPersona);
router.get('/getpersona', personaCtrl.getPersona);//modificado
router.put('/update', personaCtrl.editPersona);//modificado
router.delete('/delete', personaCtrl.deletePersona);//modificado
router.put('/addRol',personaCtrl.addRol);//modificado 
router.delete('/deleteRol',personaCtrl.deleteRol); //modificado 
router.get('/filtro/dni', personaCtrl.getPersonaByDni);
module.exports = router;