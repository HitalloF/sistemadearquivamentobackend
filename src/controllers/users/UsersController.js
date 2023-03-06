require("dotenv").config();
const Model = require('../../models/users/UserModel')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

module.exports = {

    BuscarTodos : async (req,res) =>{
        const users = await Model.findAll();
        try{
            res.status(200).json(users)
        }catch(err){
            console.log(err)
            res.status(404).json({msg:"ERRO TENTE NOVAMENTE MAIS TARDE."})
        }
    },
    CadastrarUser : async (req,res)=>{
        const {name, email, password,confirmpassword } = req.body

        // PASSWORD CREATE
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password,salt)

        if(!name){
            return res.status(422).json({msg: "O NOME É OBRIGATORIO"})
        }
        if(!email){
            return res.status(422).json({msg: "O EMAIL É OBRIGATORIO"})
        }
        if(!password){
            return res.status(422).json({msg: "O PASSWORD É OBRIGATORIO"})
        }
        if(password !== confirmpassword){
            return res.status(422).json({msg: "AS SENHAS NÃO SAO IGUAIS"})
        }

        try{
            const userSave = await  Model.create({name,email, password:passwordHash})
            res.status(202).json(userSave)
        }catch(err){
            console.log(err)
            res.status(400).json({msg: "ERRO NO SERVIDOR, TENTE NOVAMENTE MAIS TARDE!"})
        }
    },
    // CRIAR TOKEN
    Login : async (req,res)=>{
        const { email ,password } = req.body;
        const user = await Model.findOne({where:{email:email}});
        // VERIFICAR OS CAMPOS
        if(!email){
            return res.status(422).json({msg: "PREENCHAR O CAMPO DE EMAIL"})
        }
        if(!password){
            return res.status(422).json({msg: "PREENCHAR O CAMPO DA SENHA"})
        }
        // CONFIRMA A SENHA
        const passwordCheck = await bcrypt.compare(password, user.password)
       // COMPARANDO O LOGIN DO BD COM O ENVIADO
        if(!passwordCheck){
            return res.status(422).json({msg: "Senha inválida"})
        }
        try{
            const secret = process.env.SECRET
            const token = jwt.sign({
                id: user._id    
            },
            secret,
            )
            res.status(200).json({msg:'AUTENTIFICADO COM SUCESSO', token})
        }catch(err){
            console.log(err)
            res.status(500).json({msg: "ERRO NO SERVIDOR, TENTE NOVAMENTE MAIS TARDE!"})            
        }

    },
    // BUSCAR USER PELO ID
    BuscarId : async (req,res) =>{
        const {id} = req.params
        const user = await Model.findOne({where:{id:id}})

        if(!user){
            return res.status(440).json({msg:"USUARIO NÃO ENCONTRADO"})
        }
        try{
            res.status(200).json(user)
        }catch(err){
            console.log(err)
            res.status(400).json({msg:"ERRO NO SERVIDOR"})
        }


    },
    // DELETAR USUARIO
    DeletarUser: async (req,res)=>{
        const {id} = req.params
        const user = await Model.findOne({whrer:{id:id}})

        if(!user){
            res.status(401).json({msg: "ARQUIVO NÃO ENCONTRADO"})
        }
        try{
            const user = await Model.destroy({where:{id}})
            res.status(202).json(user)


        }catch(err){
            console.log(err)
            res.status(400).json({msg:"ERRO NO SERVIDOR"})
        }      
    },
    // MODIFICAR USUARIO
    ChangeUser : async (req,res)=>{
        const {id} = req.params
        const {name,email,password} = req.body
        const user = await Model.findOne({where:{id:id}})
        // PASSWORD CREATE
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password,salt)

        if(!user){
            res.status(400).json({msg:"USUARIO NÃO ENCONTRADO"})
        }
        try{
            const changeUser = await Model.update({name,email,password:passwordHash  }, {where:{id}})
            res.status(200).json({msg:"MODIFICADO COM SUCESSO", email,changeUser})


        }catch(err){
            console.log(err)
            res.status(400).json({msg:"ERRO NO SERVIDOR"})
        }
    }
    ,
    // BUSCAR PELO EMAIL
    ProcuraEmail : async (req,res)=>{
        const {email} = req.body
        const user = await Model.findAll({where:{email:email}})
        
        if(!user){
            res.status(404).send({msg:"EMAIL NÃO ENCONTRADO"})
        }
        try{
            res.status(200).send({user})

        }catch(err){
            console.log(err)
            res.status(400).send({msg:"ERRO NO SERVIDOR"})
        }
    }






}