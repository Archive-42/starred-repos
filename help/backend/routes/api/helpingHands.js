const express = require('express');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');

const { requireAuth } = require('../../utils/auth');
const { HelpingHand, User } = require('../../db/models');

const router = express.Router();

/****************** ADD HELPING HANDS **************************/

router.post('/', requireAuth, asyncHandler(async (req, res) => {
  const { id, likerId } = req.body;
  const likeId = parseInt(id, 10)
  const userId = parseInt(likerId, 10)
  const exists = await HelpingHand.findAll({
    where: {
      "userId": userId,
      "likerId": likeId
    }
  })
  if (!exists.length) {
    const hand = HelpingHand.build({
      likerId: likeId,
      userId: userId,
    
    });
    const validateErrors = validationResult(req);
    if (validateErrors.isEmpty()) {
      await hand.save();
      res.status(204).end()
    } else {
      const errors = validateErrors.array().map(error => error.msg);
      return res.json({
        errors
      });
    }
  } else {
    let removeHand = await HelpingHand.destroy({
      where: {
        "likerId": likeId,
        "userId": userId
      }
    })
    return res.json({
      removeHand
    })
  }
}));

/****************** FIND HELPING HANDS **************************/

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const searchId = req.params.id;
    let hands = await HelpingHand.findAll({
      where: {
        "userId": searchId
      }
    })

    const allHands = hands.length

    return res.json({
      allHands, hands
    });
  }),
);



module.exports = router;