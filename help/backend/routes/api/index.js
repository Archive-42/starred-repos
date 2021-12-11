const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const searchRouter = require('./searchbar')
const peopleRouter = require('./people')
const helpingHandsRouter = require('./helpingHands')
const testimonyRouter = require('./testimony')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/search', searchRouter);
router.use('/people', peopleRouter);
router.use('/helpingHands', helpingHandsRouter);
router.use('/testimony', testimonyRouter)


module.exports = router;
