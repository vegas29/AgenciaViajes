import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});

const app = express();

//Conectar la base de datos

db.authenticate()
    .then(()=> console.log('Base de datos conectada'))
    .catch(error => console.log(error));

//Definir el puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

//Habilitar pug
app.set('view engine', 'pug');

//Obtener el año actual
app.use((req, res, next)=>{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = 'Agencia de Viajes';
    next();
});

//Agregar body parser para leer los datos
app.use(express.urlencoded({extended:true}));

//Definir una carpeta publica
app.use(express.static('public'));

//Agregar router
app.use('/', router);


app.listen(port, host, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})