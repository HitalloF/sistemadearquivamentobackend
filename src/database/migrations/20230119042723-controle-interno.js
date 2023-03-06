'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {

     return queryInterface.createTable('ControleInternoFiles', { 
      id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      oficio: {
        type: Sequelize.INTEGER,
        allowNull: false
      },  
      setor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      anexo: {
        type: Sequelize.STRING,
        allowNull: false
      },

    });
   
  },

   down (queryInterface, Sequelize) {

     return queryInterface.dropTable('ControleInternoFiles');
  
  }
};