'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Testimonies', [
      {
        userId: 1,
        commenterId: 2,
        comment: "Did a great job helping get my groceries.  Thank you!!!!!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        commenterId: 3,
        comment: "Arrived on time and was very friendly and courteous",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        commenterId: 4,
        comment: "Always is willing to help with any task I have.  Even helped me clean up some wood from my backyard.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        commenterId: 5,
        comment: "Thank you!!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        commenterId: 1,
        comment: "The nicest old couple you will ever meet!  Even backed me some cookies that my faimly LOVES!!!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        commenterId: 7,
        comment: "Loved working here.  Would help out again, whever they need!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        commenterId: 8,
        comment: "Don't leave without some homemade cookies!!!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        commenterId: 10,
        comment: "Very nice people.  Enjoyed taking the trash out for them.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        commenterId: 11,
        comment: "Just a fantastic experience all around, and they only live two streets over from me and I never knew!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Testimonies', {});
  }
};
