const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Task, User } = require('../../db/models');

const router = express.Router();

/****************** FIND TASKS **************************/

router.get(
  '/:id/tasks',
  requireAuth, 
  asyncHandler(async (req, res) => {
    const urlId = req.params.id;
    let user = await User.findByPk(urlId)
    let helpType = user.dataValues.helpType;

    if (helpType) {
      help = 'helperId'
    } else {
      help = 'helpeeId'
    }
    let tasks = await Task.findAll({
      where: {
        [help]: urlId
      }
    })

    return res.json({
      tasks,
      helpType
    });
  }),
);

/****************** ADD TASK **************************/

router.post('/:id/tasks', requireAuth, asyncHandler(async (req, res) => {
  const { choreType, taskDetails} = req.body;
  const userId = parseInt(req.params.id)
    const task = Task.build({
      helpeeId: userId,
      details: taskDetails,
      category: choreType,
      completed: false,
    });
    await task.save();
    return res.json({
      task
    });
}));

/****************** UPDATE TASK **************************/
  
  router.patch('/:id/tasks', requireAuth, asyncHandler(async (req, res) => {
    let { taskId, name, userId } = req.body
    const id = parseInt(taskId)
    const user = parseInt(userId)
    if (!name) {
      await Task.update({ helperId: user }, {
        where: {
          id: id
        }
      });
    } else {
      await Task.update({ completed: true }, {
        where: {
          id: id
        }
      });
    }
    let task = await Task.findByPk(id)
      return res.json({
        task
      });
  }));


module.exports = router;