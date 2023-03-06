const { Model, DataTypes} = require('sequelize');

class ControleInternoFiles extends Model {
    static init(sequelize){
        super.init({
            oficio:DataTypes.INTEGER,
            setor:DataTypes.STRING,
            data:DataTypes.INTEGER,
            anexo:DataTypes.STRING
        },{
            sequelize
        })
    }
}

module.exports = ControleInternoFiles;