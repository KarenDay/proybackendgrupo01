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
    console.log(area);
    if(Array.isArray(areaEncontrada)&& areaEncontrada.length>0 ){
        res.json({
            'status': '0',
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

areaCtrl.addResponsable = async (req,res)=>{
    const idArea = req.query.id;
    const idResp = req.query.idResponsable;
    var area = await Area.findById(idArea);
    var responsable = await Persona.findById(idResp);
    try{
        area.responsables.push(idResp);
        await Area.updateOne({_id:area._id}, area); 
        responsable.area=area;
        await Persona.updateOne({_id:responsable._id}, responsable);
        res.status(200).json({
            'status':'1',
            'msg':'Responsable agregado'
        })
    }catch{
        res.status(400).json({
            'status':'0',
            'msg':'Error al procesar la informacion'
        })
    }
}

areaCtrl.deleteResponsable = async (req,res)=>{
    
    const idArea = req.query.id;
    const idResponsable = req.query.idResponsable;
    var area = await Area.findById(idArea);
    var responsable =  await Persona.findById(idResponsable);
    try{
        area.responsables.pull(idResponsable);
        await Area.updateOne({_id:idArea},area);
        responsable.area = undefined;
        await Persona.updateOne({_id:responsable._id},responsable);
        res.status(200).json({
            'status':'1',
            'msg':'Responsable eliminado'
        })
    }catch{
        res.status(400).json({
            'status':'0',
            'msg':'Error al procesar la informacion'
        })
    }
}

module.exports = areaCtrl;