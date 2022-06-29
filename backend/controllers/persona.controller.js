const Persona = require('../models/persona');
const Rol = require('../models/rol'); 
const Area =  require('../models/area');

const personaCtrl = {}

personaCtrl.getPersonas = async (req, res) => {
    var apersonas = await Persona.find()
    .populate('area')
    .populate('roles');
    res.json(apersonas);
}
personaCtrl.createPersona = async (req, res) => {

    var apersona = new Persona(req.body);
    try {
        await apersona.save();
        res.json({
        'status': '1',
        'msg': 'Persona guardada.'})
    } catch (error) {
        res.status(400).json({
        'status': '0',
        'msg': 'Error procesando operacion.'})
    }
}

personaCtrl.getPersona = async (req, res) => {
    const apersona = await Persona.findById(req.query.id)
    .populate('area')
    .populate('roles');
    res.json(apersona);
    //console.log(apersona);
}

personaCtrl.editPersona = async (req, res) => {
    const persona = new Persona(req.body);
    const roles =  new Rol(req.body.roles);
    try {
        //persona.roles.push(roles);
        await Persona.updateOne({_id: req.body._id}, persona);
        res.json({
        'status': '1',
        'msg': 'Persona updated'
    }) 
    } catch (error) {
        res.status(400).json({
        'status': '0',
        'msg': 'Error procesando la operacion'
        }) 
    }
}
personaCtrl.deletePersona = async (req, res)=>{
    try {
        await Persona.deleteOne({_id: req.query.id});
        res.json({
        status: '1',
        msg: 'Persona removed'
        }) 
    } catch (error) {
        res.status(400).json({
        'status': '0',
        'msg': 'Error procesando la operacion'
        }) 
    }
}

personaCtrl.addRol = async (req,res)=>{
    const idRol = req.query.idRol;
    const idPersona = req.query.id;
    var rol = await Rol.findById(idRol);
    var persona = await Persona.findById(idPersona);
    try{
        persona.roles.push(idRol);
        await Persona.updateOne({_id: persona._id}, persona);
        //await persona.save();
        rol.personas.push(idPersona);
        await Rol.updateOne({_id: rol._id}, rol);
        //await rol.save();
        res.status(200).json({
            'status':'1',
            'msg':'Rol agregado'
        })
    }catch{
        res.status(400).json({
            'status':'0',
            'msg':'Error al procesar la informacion'
        })
    }
}

personaCtrl.deleteRol = async (req,res)=>{
    const idPersona = req.query.id;
    const persona = await Persona.findById(idPersona);
    const idRol = req.query.idRol;
    const rol = await Rol.findById(idRol);
    try{
        persona.roles.pull(idRol);
        await Persona.updateOne({_id:idPersona},persona);
        rol.personas.pull(idPersona);
        await Rol.updateOne({_id:idRol},rol);
        res.status(200).json({
            'status':'1',
            'msg':'Rol eliminado'
        })
    }catch{
        res.status(400).json({
            'status':'0',
            'msg':'Error al procesar la informacion'
        })
    }
}

personaCtrl.addArea = async(req,res)=>{
    const idArea = req.query.idArea;
    const idPersona = req.query.id;
    //var area = await Area.findById(idArea);
    var persona = await Persona.findById(idPersona);
    try{
        persona.area= idArea;
        await persona.save();
        res.status(200).json({
            'status':'1',
            'msg':'Area agregada'
        })
    }catch{
        res.status(400).json({
            'status':'0',
            'msg':'Error al procesar la informacion'
        })
    }
}

personaCtrl.deleteArea = async (req,res)=>{
    const idPersona = req.query.id;
    const persona = await Persona.findById(idPersona);
    //const idArea = req.query.idArea;
    try{
        persona.area=undefined;
        await Persona.updateOne({_id:idPersona},persona);
       
        res.status(200).json({
            'status':'1',
            'msg':'Area eliminada, la persona ya no pertenece a un Area'
        })
    }catch{
        res.status(400).json({
            'status':'0',
            'msg':'Error al procesar la informacion'
        })
    }
}


personaCtrl.getPersonaByDni = async (req, res) => {
    criteria={};
    if (req.query.dni != null){
        criteria.dni= req.query.dni;
    }
    //({dni:{$eq:criteria.dni}})
    var persona =  await Persona.find
    ({dni:{$eq:criteria.dni}})
    .populate('roles');
    
    res.json(persona);
}
module.exports = personaCtrl;