const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const NodeGeocoder = require('node-geocoder')

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const tasksRouter = require('./tasks')

const router = express.Router();

router.use('/', tasksRouter);


/****************** SIGNUP ERRORS MIDDLEWARE **************************/

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('helpType')
    .exists({ checkFalsy: true })
    .withMessage('Choose either helper or helpee'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('You must include a first name'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('You must include a last name'),
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('You must include an address'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('You must include a city'),
  check('state')
    .exists({ checkFalsy: true })
    .isLength({ max: 2 })
    .withMessage('You must include a state of two characters'),
  check('zipCode')
    .exists({ checkFalsy: true })
    .withMessage('You must include a zip code'),
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

/****************** SIGNUP **************************/

router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { username, email, password, helpType, firstName, lastName, address, city, state, zipCode } = req.body;
    const formatAddress = `${address}, ${city}, ${state}, ${zipCode}`
    let { lat, lng } = await geocodeAddress(formatAddress)
    lat = parseFloat(lat, 10)
    lng = parseFloat(lng, 10)
    const user = await User.signup({ username, firstName, lastName, email, password, helpType, address, city, state, zipCode, lat, lng });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

/****************** USERS PAGE **************************/

router.get('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10)
  const user = await User.findByPk(userId)
  if (user) {
    return res.json({
      user
    })
  }
    return res.json('No User Found!');
  }))


module.exports = router;