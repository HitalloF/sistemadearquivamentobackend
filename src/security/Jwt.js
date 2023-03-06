const jwt = require('jsonwebtoken')

// Checar se o token é valido para a pag.

function checkToken (req ,res ,next){
    authHead = req.headers['authorization']
    const token = authHead && authHead.split(" ")[1]

    if(!token){
        return res.status(401).json({msg: "ACESSO NEGADO"})
    }
    try{
        const secret =process.env.SECRET
        jwt.verify(token,secret)
        next()
        console.log(token)


    }catch(err){
        console.log(err)
        res.status(400).json({msg: "TOKEN INCORRETO"})
    }

}
module.exports = checkToken