require("dotenv").config();
require('./database') // iniciando database
const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const path = require('path')
var cors = require('cors')


app.use(cors());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

// STATICS DE ARQUIVOS
// app.use(express.static(path.join(__dirname, '../arquivos')));
//console.log(path.join(__dirname)+ '/arquivos');
console.log( path.join(__dirname, '../' ,'/arquivos'));
app.use('/arquivos', express.static(path.join(__dirname,'../' , '/arquivos')))

// IMPORTA DA ROTAS
const ControleInternoRotas = require('./routes/ControleInterno/ControleInternoRouter')
const UsersRotas = require('./routes/users/UserRoutes')


app.use(ControleInternoRotas)
app.use(UsersRotas)

app.get('*', function(req, res){
  console.log('Rota errada', req.url)
  res.status(404).send()
})

app.listen(3000, ()=>{console.log(" FLA 1.0.0 RONDANDO NA PORTA 3000")})