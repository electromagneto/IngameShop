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
   
    const profiles = JSON.parse(fs.readFileSync('./data/accounts.json', 'utf-8'))
     .map((el) => {
        const { name, profilePicture, id } = el;
        return {
          name, profilePicture,
          UserId: id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      });

    return queryInterface.bulkInsert('Profiles', profiles);
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Profiles', null);
  }
};
