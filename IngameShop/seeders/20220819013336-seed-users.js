'use strict';

const fs = require('fs');

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
        const { email, password, role } = el;
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
