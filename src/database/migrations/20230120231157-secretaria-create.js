'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {

     return queryInterface.createTable('secretarias', { 
      id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      name: {
        type: Sequelize.INTEGER,
        allowNull: false
      },  
      endereco: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
   
  },

   down (queryInterface, Sequelize) {

     return queryInterface.dropTable('secretarias');
  
  }
};