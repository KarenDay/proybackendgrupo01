const Usuario = require ('./../models/usuario')
const usuarioCtrl = {}
//const ObjectId = require('mongodb').ObjectID;
var ObjectId = require('mongoose').Types.ObjectId; 
usuarioCtrl.createUsuario = async (req, res)=>{
    
    const usuario = new Usuario (req.body);
    try {
        await usuario.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Usuario guardado.'
        })
    } catch (error) {
        res. status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
   }
usuarioCtrl.loginUsuario = async (req, res)=>{
    //en req.body se espera que vengan las credenciales de login
    //defino los criterios de busqueda en base al username y password recibidos
    const criteria = {
    username: req.body.username,
    password: req.body.password
    }
    //el método findOne retorna un objeto que cumpla con los criterios de busqueda
    Usuario.findOne(criteria, function(err, user) {
    //el método findOne retorna un objeto que cumpla con los criterios de busqueda
    if (err) {
        res.json({
        status: 0,
        msg: 'error'})
        };
    if (!user) {
        res.json({
        status: 0,
        msg: "not found" })
    } else {
        res.json({
            status: 1,
            msg: "success",
            username: user.username, //retorno información útil para el frontend
            rol: user.rol.nombreRol,
            //perfil: user.perfil, //retorno información útil para el frontend
            userid: user._id //retorno información útil para el frontend
        })
    }
    
    })
}

usuarioCtrl.getUsuarioByPersona = async (req, res) => {
    criteria={};
    if (req.query.idPersona!= null){
       criteria.persona= req.query.idPersona;
    }
    console.log(criteria.persona);
    var usuario =  await Usuario.find({persona: ObjectId(req.query.idPersona)});
    
    res.json(usuario);
    console.log("persona encontradas: "+usuario);
}

//exportacion del modulo controlador
module.exports= usuarioCtrl;
