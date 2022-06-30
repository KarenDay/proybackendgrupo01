const express = require('express');
const cors = require('cors');
const {mongoose} = require('./database');
var app = express();


//middlewares
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));


//Cargamos el modulo de direccionamiento de rutas
app.use('/api/rol', require('./routers/rol.route'));
app.use('/api/area', require('./routers/area.route'));
app.use('/api/persona', require('./routers/persona.route'));
app.use('/api/medio', require('./routers/medio.route'));
app.use('/api/anuncio', require('./routers/anuncio.route'));
app.use('/api/usuario', require('./routers/usuario.route'));

//setting
app.set('port', process.env.PORT || 3000);

//starting the server
app.listen(app.get('port'), () => {
console.log(`Server started on port`, app.get('port'));
});