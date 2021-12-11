'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [
      {
        category: "Yard Work",
        details: "I need someone to mow my lawn",
        helperId: 1,
        helpeeId: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
      },
      {
        category: "Yard Work",
        details: "I need someone to clean my gutters",
        helperId: 7,
        helpeeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
      },
      {
        category: "Yard Work",
        details: "I need someone to water my flower pots",
        helperId: 8,
        helpeeId: 19,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
      },
      {
        category: "Yard Work",
        details: "I need someone to trim the hedges",
        helperId: 11,
        helpeeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: true
      },
      {
        category: "Yard Work",
        details: "I need someone to rake up the leaves in the yard",
        helperId: 20,
        helpeeId: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
      },
      {
        category: "Yard Work",
        details: "I need someone to rake up the leaves in the yard",
        helperId: 20,
        helpeeId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: true
      },
      {
        category: "Yard Work",
        details: "I need someone to rake up the leaves in the yard",
        helpeeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
      },
      {
        category: "Yard Work",
        details: "I need someone to rake up the leaves in the yard",
        helpeeId: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
      },
      {
        category: "Yard Work",
        details: "I need someone to mow the grass",
        helpeeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
      },
      {
        category: "Yard Work",
        details: "I need someone to water my plants",
        helpeeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
      },
      {
        category: "House Chores",
        details: "I need someone to take out the trash while I visit my grandchildren.",
        helpeeId: 9,
        helperId: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
      },
      {
        category: "House Chores",
        details: "I need someone to get boxes down from the attic.",
        helpeeId: 15,
        helperId: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
      },
      {
        category: "House Chores",
        details: "I need someone to get antiques down from the attic.",
        helpeeId: 4,
        helperId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
      },
      {
        category: "House Chores",
        details: "I need someone to sweep my back patio, since I have arthritis and can't do it myself.",
        helpeeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
      },
      {
        category: "House Chores",
        details: "I need someone to help me move furniture since I have a bad back.",
        helpeeId: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
      },
      {
        category: "House Chores",
        details: "I need someone to help me to take out old furniture to the curb I don't need anymore.",
        helpeeId: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
      },
      {
        category: "Grocery Shopping",
        details: "I need someone to pick up a stick of butter for me since I don't have a car",
        helpeeId: 12,
        helperId: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: true
      },
      {
        category: "Grocery Shopping",
        details: "I need someone to pick up a gallon of milk and a dozen eggs",
        helpeeId: 13,
        helperId: 16,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
      },
      {
        category: "Grocery Shopping",
        details: "I need someone to pick up a half pound of chicken sandwich meat",
        helpeeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
      },
      {
        category: "Grocery Shopping",
        details: "I need someone to pick up five bananas, a cucumber, and two tomatoes",
        helpeeId: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
      },
      {
        category: "Other",
        details: "I need someone to pick up my drycleaning from Amy's Drycleaning",
        helpeeId: 5,
        helperId: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
      },
      {
        category: "Other",
        details: "I need someone to pick up 4 medium sized boxes",
        helpeeId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', {});
  }
};