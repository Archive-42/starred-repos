const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const NodeGeocoder = require('node-geocoder');
const { handleValidationErrors } = require('../../utils/validation');

const { User, Sequelize, Task } = require('../../db/models');

const Op = Sequelize.Op

/****************** LOGIN ERRORS MIDDLEWARE **************************/

const validateSearch = [
  check('keywordSearch' || 'locationSearch')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a search term.'),
  handleValidationErrors,
];


/****************** GEOCODER ************************/

async function geocodeAddress (address) {
  const options = {
    provider: 'google',
    apiKey: process.env.GOOGLE_API,
    formatter: null
  };
  
  const geocoder = NodeGeocoder(options);
  
  const result = await geocoder.geocode(address);
  const point = { lat: result[0].latitude, lng: result[0].longitude }
  return point;
}

/****************** SEARCH DATABASE **************************/

router.post(
  '/',
  validateSearch,
  asyncHandler(async (req, res, next) => {

    const { keywordSearch, locationSearch } = req.body;

    let locals;
    let keywords;
    if (keywordSearch.includes(' ')) {
      keywords = keywordSearch.split(' ')
      for (let i = 0; i < keywords.length; i++){
        keywords[i] = '%'+keywords[i]+'%'
      }
    }

    let newSearch;
    if (keywords) {
      newSearch = keywords
    } else {
      newSearch = ['%'+keywordSearch+'%']
    }

    if (locationSearch) {
      let { lat, lng } = await geocodeAddress(locationSearch)
      lat = parseFloat(lat, 10)
      lng = parseFloat(lng, 10)
      locals = await User.findAll({
        where: {
          [Op.and]: [{
          lat: {
            [Op.between]: [(lat - .5), (lat + .5)]
          },
          lng: {
            [Op.between]: [(lng - .5), (lng + .5)]
            },
          }],
          [Op.or]: [
            {
              firstName: {
                [Op.iLike]: { [Op.any]: newSearch }
              }
            },
            {
              lastName: {
                [Op.iLike]: { [Op.any]: newSearch }
              }
            },
            {
              email: {
                [Op.iLike]: { [Op.any]: newSearch }
              }
            },
            {
              username: {
                [Op.iLike]: { [Op.any]: newSearch }
              }
            }
          ]
        },
      })
    } else {
      locals = await User.findAll({
        where: {
          [Op.or]: [
            {
              firstName: {
                [Op.iLike]: { [Op.any]: newSearch }
              }
            },
            {
              lastName: {
                [Op.iLike]: { [Op.any]: newSearch }
              }
            },
            {
              email: {
                [Op.iLike]: { [Op.any]: newSearch }
              }
            },
            {
              username: {
                [Op.iLike]: { [Op.any]: newSearch }
              }
            }
          ]
        }
      })
    }

    if (locals.length === 0) {
      let err = 'No results found'
      return res.json({
        err,
      });
    }

    return res.json({
      locals,
      apiKey: process.env.GOOGLE_API,
    });

  }),
);

module.exports = router;