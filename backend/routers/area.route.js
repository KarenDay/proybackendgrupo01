const areaCtrl = require('./../controllers/area.controller');

const autCtrl = require('./../controllers/auth.controller');


const express = require('express');
const router = express.Router();

router.get('/', areaCtrl.getAreas);
router.post('/',  areaCtrl.createArea);
router.get('/getArea', autCtrl.verifyToken, areaCtrl.getArea);
router.put('/update', autCtrl.verifyToken, areaCtrl.editArea);
router.delete('/delete', autCtrl.verifyToken, areaCtrl.deleteArea);
router.get('/filtro/nombre', autCtrl.verifyToken, areaCtrl.buscarAreaPorNombre);
module.exports = router;