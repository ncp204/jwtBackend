'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users',
      [
        {
          email: 'ncphuc.20.04.01@gmail.com',
          password: '123',
          firstName: 'Nguyễn',
          lastName: 'Phúc',
          address: 'Bình Dương',
          gender: 1,
          typeRole: 'ROLE',
          keyRole: 'R1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'test01@gmail.com',
          password: '123',
          firstName: 'Nguyễn',
          lastName: 'A',
          address: 'Ho Chi Minh',
          gender: 1,
          typeRole: 'ROLE',
          keyRole: 'R2',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'test02@gmail.com',
          password: '123',
          firstName: 'Nguyễn',
          lastName: 'B',
          address: 'Dong Nai',
          gender: 1,
          typeRole: 'ROLE',
          keyRole: 'R3',
          createdAt: new Date(),
          updatedAt: new Date()
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
