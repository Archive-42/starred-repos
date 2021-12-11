var express = require('express');
var router = express.Router();
var keyStore = require('../key-store');


router.get('/', keyStore);


module.exports = router;
