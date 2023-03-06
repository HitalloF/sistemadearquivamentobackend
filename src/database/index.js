const Sequelize = require('sequelize');
const configDB = require('../config/database');
const connection = new Sequelize(configDB);



// CONECTANDO MODEL AO BANCO DE DADOS
const ControleInternoModel = require('../models/controleInterno/ControleInternoModel')
ControleInternoModel.init(connection)
const UsersModel = require('../models/users/UserModel')
UsersModel.init(connection)


module.exports = connection