const Area = require('../models/area');
const Persona = require('../models/persona'); 
const areaCtrl = {}

areaCtrl.getAreas = async (req, res) => {
    var aAreas = await Area.find().populate('responsables');
    res.json(aAreas);
}

areaCtrl.createArea = async (req, res) => {   
    var area = new Area(req.body);
    const areaEncontrada = await Area.find({nombreArea:{$eq:req.body.nombreArea}});
    if(Array.isArray(areaEncontrada)&& areaEncontrada.length>0 ){
        res.json({
            'status': '2',
            'msg': 'Ya se encuentra un area con ese nombre'})
    }else{
        try {
            await area.save();
            res.json({
            'status': '1',
            'msg': 'Area guardada.'})
        } catch (error) {
            res.status(400).json({
            'status': '0',
            'msg': 'Error al procesar la operacion.'})
        }
    }
    
}

areaCtrl.getArea = async (req, res) => {
    const area = await Area.findById(req.query.id).populate('responsables');
    res.json(area);
}

areaCtrl.editArea = async (req, res) => {
    const area = new Area(req.body);
    const responsables =  new Area(req.body.responsables);
    const areaEncontrada = await Area.findOne({nombreArea:{$eq:req.body.nombreArea}});
    if (areaEncontrada==null || areaEncontrada=="" || areaEncontrada==undefined) {
        try {
            area.responsables.push(responsables);// 
            await Area.updateOne({_id: req.body._id}, area);
            res.json({
            'status': '1',
            'msg': 'Area actualizada'
        }) 
        } catch (error) {
            res.status(400).json({
            'status': '0',
            'msg': 'Error al procesar la operacion'
            }) 
        }
    }else{
        res.json({
            status:"2",
            msg:"Ya se encuentra un area registrada con ese nombre"
        })
    }
}
areaCtrl.deleteArea = async (req, res)=>{
    const area = await Area.findById(req.query.id);
        try {
            await Area.deleteOne({_id: area._id});
            res.json({
            status: '1',
            msg: 'Area removed'
            }) 
        } catch (error) {
            res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
            }) 
        }
}

areaCtrl.buscarAreaPorNombre = async (req, res) => {
    let criteria={};
    if(req.query.nombreArea!=null || req.query.nombreArea!="")
        criteria.nombreArea = { $regex: req.query.nombreArea, $options: "i" }
    const area = await Area.find(criteria)
    .populate('responsables');
    res.json(area);
}

module.exports = areaCtrl;