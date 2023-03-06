const { Model, DataTypes} = require('sequelize');

class users extends Model {
    static init(sequelize){
        super.init({
            name:DataTypes.STRING,
            email:DataTypes.STRING,
            password:DataTypes.STRING
        },{
            sequelize
        })
    }
}

module.exports = users;