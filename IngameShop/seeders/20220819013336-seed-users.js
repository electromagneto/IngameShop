'use strict';

const fs = require('fs');
const bcrypt = require('bcryptjs');

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

    const users = JSON.parse(fs.readFileSync('./data/accounts.json', 'utf-8'))
     .map((el) => {
       let { email, password, role } = el;
       const salt = bcrypt.genSaltSync(5);
       password = bcrypt.hashSync(password, salt);
       return {
         email, password, role,
         createdAt: new Date(),
         updatedAt: new Date(),
       }
     });
    
    return queryInterface.bulkInsert('Users', users);
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null);
  }
};
