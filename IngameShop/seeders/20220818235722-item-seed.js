'use strict';
const fs = require('fs')
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let data = JSON.parse(fs.readFileSync('./item.json','utf-8'))
   data = data.map((att) =>{
    return {
      "name" :att.name,
      "price": att.price,
      "stock": att.stock,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }
   })
   return queryInterface.bulkInsert('Items', data, {})
  },


  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Items',null,{})
  }
};
