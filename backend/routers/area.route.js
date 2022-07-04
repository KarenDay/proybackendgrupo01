const areaCtrl = require('./../controllers/area.controller');

const express = require('express');
const router = express.Router();

router.get('/',areaCtrl.getAreas);
router.post('/', areaCtrl.createArea);
router.get('/getArea',areaCtrl.getArea);
router.put('/update', areaCtrl.editArea);
router.delete('/delete', areaCtrl.deleteArea);
//router.post('/addResponsable',areaCtrl.addResponsable);//No se utiliza
//router.delete('/deleteResponsable', areaCtrl.deleteResponsable);//No se utiliza
router.get('/filtro/nombre',areaCtrl.buscarAreaPorNombre);
module.exports = router;