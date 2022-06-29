const areaCtrl = require('./../controllers/area.controller');

const express = require('express');
const router = express.Router();

router.get('/',areaCtrl.getAreas);
router.post('/', areaCtrl.createArea);
router.get('/getArea',areaCtrl.getArea);//modficado
router.put('/update', areaCtrl.editArea);//mod
router.delete('/delete', areaCtrl.deleteArea);//mod
router.post('/addResponsable',areaCtrl.addResponsable);
router.delete('/deleteResponsable', areaCtrl.deleteResponsable);

module.exports = router;