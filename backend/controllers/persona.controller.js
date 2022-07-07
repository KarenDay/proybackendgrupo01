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
    console.log("dni: "+ req.body.dni);
    const personaEncontradaPorDni = await Persona.findOne({dni:{$eq:req.body.dni}});
    console.log(personaEncontradaPorDni);
    if (personaEncontradaPorDni==null || personaEncontradaPorDni=="" || personaEncontradaPorDni==undefined) {
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
    }else{
        res.json({
            status:"2",
            msg:"Ya se encuentra una persona registrada con ese numero de dni"
        })
    }
}

personaCtrl.getPersona = async (req, res) => {
    console.log(req.query.id);
    const apersona = await Persona.findById(req.query.id)
    .populate('area')
    .populate('roles');
    res.json(apersona);
    console.log(apersona);
}

personaCtrl.editPersona = async (req, res) => {
    const persona = new Persona(req.body);
    console.log("Dni:"+req.body.dni);
    console.log("ID"+req.body._id);
    const pSinCambioDni = await Persona.findOne({$and:[
                                                {_id:{$eq:req.body._id}},
                                                {dni:{$eq:req.body.dni}}
                                            ]});
    console.log(pSinCambioDni);
    

    if(pSinCambioDni!=null && pSinCambioDni!="" && pSinCambioDni!=undefined){
        try {
            console.log("no hubo cambio de dni");
            await Persona.updateOne({_id: req.body._id}, persona);
            res.json({
            'status': '1',
            'msg': 'Persona actualizada correctamente'
        }) 
        } catch (error) {
            res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
            }) 
        }
    }else{
        const personaEncontradaPorDni = await Persona.findOne({$and:[
            {_id:{$ne:req.body._id}},
            {dni:{$eq:req.body.dni}}
          ]});
        console.log("persona buscada por dni ");
        console.log(personaEncontradaPorDni);
        if (personaEncontradaPorDni!=null && personaEncontradaPorDni!="" && personaEncontradaPorDni!=undefined) {
            res.json({
                status:"2",
                msg:"Ya se encuentra una persona registrada con ese numero de dni"
            })
        }else{
            try {
                await Persona.updateOne({_id: req.body._id}, persona);
                res.json({
                'status': '1',
                'msg': 'Persona actualizada correctamente'
            }) 
            } catch (error) {
                res.status(400).json({
                'status': '0',
                'msg': 'Error procesando la operacion'
                }) 
            }
        }
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
    if(rol.nombreRol=="ENCARGADO" || rol.nombreRol=="encargado"){
        var area = await Area.findById(persona.area);
        area.responsables.push(persona._id);
        await Area.updateOne({_id: area._id}, area);
    }
    try{
        persona.roles.push(idRol);
        await Persona.updateOne({_id: persona._id}, persona);
        rol.personas.push(idPersona);
        await Rol.updateOne({_id: rol._id}, rol);
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
    if(rol.nombreRol=="ENCARGADO" || rol.nombreRol=="encargado"){
        var area = await Area.findById(persona.area);
        area.responsables.pull(persona._id);
        await Area.updateOne({_id: area._id}, area);
    }
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

personaCtrl.getPersonaByDni = async (req, res) => {
    criteria={};
    if (req.query.dni != null){
        criteria.dni = { $regex: req.query.dni, $options: "i" }
    }
    var persona =  await Persona.find(criteria).populate('roles');
    res.json(persona);
}

personaCtrl.busquedaCombinada  = async (req, res) => {
    
    var persona =  await Persona.find({$or:[
                                            {apellido:{$eq:req.query.apellido}},
                                            {legajo:{$eq:req.query.legajo}},
                                            {nombre:{$eq:req.query.nombre}}
                                        ]}).populate('roles');
    res.json(persona);
}

module.exports = personaCtrl;