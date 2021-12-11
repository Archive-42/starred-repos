const Items = require("./items-model");

const itemsController = {
  async findAll(req, res) {
    res.status(200).json(await Items.getAll());
  },
  async findByID(req, res) {
    res.status(200).json(await Items.getById(req.params.id));
  },
  async addItem(req, res) {
    res.status(200).json(await Items.add(req.body));
  },
};

module.exports = itemsController;
