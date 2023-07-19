'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user',
      [
        {
          email: 'Test 01',
          password: '123',
          username: 'test01'
        },
        {
          email: 'Test 02',
          password: '123',
          username: 'test02'
        },
        {
          email: 'Test 03',
          password: '123',
          username: 'test03'
        }
      ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};