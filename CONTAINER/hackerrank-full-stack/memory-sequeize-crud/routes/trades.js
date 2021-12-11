const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/trades');

router.post('/', tradeController.createTrade);
router.get('/', tradeController.getAllTrades);
router.get('/:id', tradeController.getTradeById);
router.put('/:id', tradeController.updateTradeById)
router.patch('/:id', tradeController.updateTradeById)
router.delete('/:id', tradeController.updateTradeById)


module.exports = router;
