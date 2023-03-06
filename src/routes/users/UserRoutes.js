require("dotenv").config();
const express = require("express")
const router = express.Router()
const checkToken = require("../../security/Jwt") // Checar o token

// IMPORTE DO CONTROLLER
const Controller = require('../../controllers/users/UsersController')


router.get('/users', Controller.BuscarTodos); // Rota de buscar todos
router.post('/users/save', Controller.CadastrarUser) // Rota de Cadastro
router.post('/login', Controller.Login) // Gerando o Token
router.get('/user/:id',checkToken ,Controller.BuscarId) // Buscar pelo ID
router.delete('/user/delete/:id', checkToken, Controller.DeletarUser) // Deletar user
router.put('/users/change/:id', Controller.ChangeUser) // Modificar User
router.post('/users/email', checkToken, Controller.ProcuraEmail) // Pesquisar por email


module.exports = router