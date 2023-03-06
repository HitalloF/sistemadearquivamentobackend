const Model = require('../../models/controleInterno/ControleInternoModel')

module.exports = {

    // LISTAR  PELO ID
    BuscarID : async (req,res)=>{
        const { id } = req.params
        const arquivo = await Model.findOne({ where: { id:id } })

        if(!arquivo){
            res.status(404).send({msg:"NÃO FOI ENCONTRADO"})
        }
        try{
            res.status(200).send(arquivo)
        }catch(err){
            console.log(err)
            res.status(400).send({msg:"ERRO NO SERVIDOR"})
        }

    },

    // LISTAR TODOS OS ARQUIVOS
    BuscarTodos : async (req,res)=>{
    const data = await Model.findAll();
    try{
        res.status(200).json(data)

    }catch(err){
        console.log(err)
        res.json({msg:"ERROR INESPERADO"})
    }},

    // SALVAR ARQUIVO
    SaveFile : async (req,res) =>{
       
        try{    
            const {oficio, setor,data} = req.body
            const anexo = req.file.path
    
            if(!oficio){
                return res.status(422).json({msg: "O NUMER DO OFICIO É OBRIGATORIO"})
            }
            if(!setor){
                return res.status(422).json({msg: "O SETOR É OBRIGATORIO"})
            }
            if(!data){
                return res.status(422).json({msg: "A DATA É OBRIGATORIO"})
            }
            if(!anexo){
                return res.status(422).json({msg: "ANEXO VAZIO"})
            }        
            const filerSave = await Model.create({oficio,setor,data,anexo})
            console.log(anexo)
            res.status(200).json(filerSave)

        }catch(err){
            console.log(err)    
            res.status(500).json({msg: "ERRO NO SERVIDOR, TENTE NOVAMENTE MAIS TARDE!"})
         }
    },
    // Deletar Arquvio
    DeletarArquivo : async (req,res)=>{
        const {id} = req.params
        const arquivo = await Model.findOne({where:{id:id}})

        if(!arquivo){
            res.status(401).json({msg: "ARQUIVO NÃO ENCONTRADO"})
        }
        try{
            const arquivo = await Model.destroy({where:{id}})
            res.status(202).json(arquivo)


        }catch(err){
            console.log(err)
            res.status(400).json({msg:"ERRO NO SERVIDOR"})
        }      
    },
    // MODIFICAR ARQUIVO
    ModificarArquivos :  async (req,res)=>{
        const { id } = req.params
        const arquivo = await Model.findOne({ where: { id } })
        const { oficio, setor, data } = req.body
        const anexo = req.file.path

        try {
            if (!arquivo) {
                res.status(401).json({ message: " ARQUIVO NÃO ENCONTRADO" })
            } else {
                const ChangeArquivo = await Model.update({ oficio, setor, data,anexo }, { where: { id } })
                res.status(200).send({msg:"ARQUIVO ALTERADO", ChangeArquivo })
            }
        } catch (error) {
            res.status(400).json({ erro })
        }
    }, 
    // PESQUISA PELO NUMERO DO OFICIO
    SeachOfice : async (req,res)=>{
        const {oficio} = req.params
        console.log(oficio)
        const arquivo = await Model.findAll({where:{oficio:oficio}})
        
        if(!arquivo){
            res.status(404).send({msg:"ARQUIVO NÃO ENCONTRADO"})
        }
        try{
            res.status(200).send({arquivo})

        }catch(err){
            console.log(err)
            res.status(400).send({msg:"ERRO NO SERVIDOR"})
        }
    },
    // LISTAR TODOS OS ARQUIVOS
    BuscarTodos : async (req,res)=>{
        const data = await Model.findAll();
        try{
            res.status(200).json(data)
    
        }catch(err){
            console.log(err)
            res.json({msg:"ERROR INESPERADO"})
        }},
    
    }




