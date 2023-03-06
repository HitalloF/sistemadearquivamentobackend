'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {

     return queryInterface.createTable('tests', { 
      id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      anexo: {
        type: Sequelize.STRING,
        allowNull: false
      },

    });
   
  },

   down (queryInterface, Sequelize) {

     return queryInterface.dropTable('tests');
  
  }
};