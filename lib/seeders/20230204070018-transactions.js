'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Transactions', [
      {
        name: 'Phone',
        category: 'Electronics',
        amount: 500.99,
        userId: 1
      },
      {
        name: 'Hydroflask',
        category: 'Shopping',
        amount: 34.00,
        userId: 1
      },
      {
        name: 'Keurig',
        category: 'Electronics',
        amount: 80.00,
        userId: 1
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
