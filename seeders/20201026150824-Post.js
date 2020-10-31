'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Posts', [{
        idtag: null,
        iduser: 1,
        title: "Some text title",
        content: "Some text title",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fzingnews.vn%2Fnhung-hinh-anh-luu-giu-khoanh-khac-dang-nho-cua-doi-nguoi-post860196.html&psig=AOvVaw0O2FpsVXXWnDtjN6wPARzq&ust=1604064576620000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjlvqz02ewCFQAAAAAdAAAAABAD"
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
