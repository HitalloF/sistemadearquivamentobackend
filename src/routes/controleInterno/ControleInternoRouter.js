const express = require("express")
const router = express.Router();
const path = require('path')
const multer = require('multer') //
const checkToken = require("../../security/Jwt") // Checar o token
const app = express();

// IMPORTE DO CONTROLLER
const Controller = require('../../controllers/controleInterno/ControleInternoControllers');

// UPLOAD CONFIG

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './arquivos')
    },  
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
        }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /pdf/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('APENAS PDF')
    }
}).single('anexo')

router.get('/arquivos', (req,res)=>{
    res.sendFile('index.html')
    console.log("hello")
    // res.sendFile(path.join(__dirname, 'arquivos'))
})





// ROTAS
router.get('/controleinterno/arquivos', Controller.BuscarTodos)
router.post('/controleinterno/arquivos/save', upload ,Controller.SaveFile)
router.delete('/controleinterno/arquivos/delete/:id',   checkToken,Controller.DeletarArquivo )
router.put('/controleinterno/arquivos/change/:id',upload,checkToken,Controller.ModificarArquivos )
router.get('/controleinterno/oficio/:oficio', Controller.SeachOfice)
router.get('/controleinterno/:id', Controller.BuscarID)



module.exports = router;
