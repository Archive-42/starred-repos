const express = require('express');
const asyncHandler = require('express-async-handler');

const { User, Sequelize } = require('../../db/models');
const { distance, quickSort } = require ('../utils/mathEquations')

const router = express.Router();

const Op = Sequelize.Op;

/****************** GET PEOPLE ************************/

router.post(
  '/',
  asyncHandler(async (req, res) => {
    let { lat, lng } = req.body;
    lat = parseFloat(lat)
    lng = parseFloat(lng)
  
    let users = await User.findAll({
      where: {
        lat: {
          [Op.between]: [(lat - .5), (lat + .5)]
        },
        lng: {
          [Op.between]: [(lng - .5), (lng + .5)]
        },
      }
    })
    let usersArr = [];

    users.forEach((user) => {
      let peopleDistance = distance(user, lat, lng, user.dataValues.lat, user.dataValues.lng)
      if (peopleDistance > 20) return;
      else (usersArr.push({user: peopleDistance}))
    });

    if (usersArr.length === 0) users = ["No one in your area"]
    let finalArr = quickSort(usersArr)
    users = finalArr;

    return res.json({
      users,
      apiKey: process.env.GOOGLE_API,
    });
  }),
);


/****************** GET PERSON ************************/

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id)
    const person = await User.findByPk(userId);
    const apiKey = process.env.GOOGLE_API;
    if (person) {
      return res.json({
        person,
        apiKey,
      })
    } else {
      const error = new Error('Person not Found');
      return res.json({
        error,
      })
    }

  }))

module.exports = router;