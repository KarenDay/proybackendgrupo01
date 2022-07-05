const areaCtrl = require('./../controllers/area.controller');

const autCtrl = require('./../controllers/auth.controller');


const express = require('express');
const router = express.Router();

router.get('/', autCtrl.verifyToken, areaCtrl.getAreas);
router.post('/', autCtrl.verifyToken, areaCtrl.createArea);
router.get('/getArea', autCtrl.verifyToken, areaCtrl.getArea);
router.put('/update', autCtrl.verifyToken, areaCtrl.editArea);
router.delete('/delete', autCtrl.verifyToken, areaCtrl.deleteArea);
//router.post('/addResponsable',areaCtrl.addResponsable);//No se utiliza
//router.delete('/deleteResponsable', areaCtrl.deleteResponsable);//No se utiliza
router.get('/filtro/nombre', autCtrl.verifyToken, areaCtrl.buscarAreaPorNombre);
module.exports = router;