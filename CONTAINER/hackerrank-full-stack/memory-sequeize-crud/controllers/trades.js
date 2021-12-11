const TradeModel = require("../models/trades");
const { Op } = require("sequelize");

class TradeController {
  async createTrade(req, res) {
    try {
      const { body } = req;
      const data = await TradeModel.findAll({});
      body.id = data.length + 1;
      const response = await TradeModel.create(body);
      res.status(201).json(response);
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async getAllTrades(req, res) {
    const { type, user_id } = req.query;
    console.log(type, user_id);
    let data = [];
    if (type && user_id) {
      // its not clearly written in question
      data = await TradeModel.findAll({
        where: {
          [Op.and]: [{ user_id }, { type }],
        },
      });
    } else if (type) {
      data = await TradeModel.findAll({
        where: {
          [Op.and]: [{ type }],
        },
      });
    } else if (user_id) {
      data = await TradeModel.findAll({
        where: {
          [Op.and]: [{ user_id }],
        },
      });
    } else {
      data = await TradeModel.findAll({});
    }
    res.status(200).json(data);
  }
  async getTradeById(req, res) {
    const { id } = req.params;
    const data = await TradeModel.findOne({ id });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).send("ID not found");
    }
  }
  updateTradeById(req, res) {
    res.status(405).json({ message: "Not allowed" });
  }
}

module.exports = new TradeController();
