const bcrypt = require("bcryptjs");
const Users = require("./auth-model");
const tokenBuilder = require("./token-builder");

const ROUNDS = process.env.ROUNDS || 8;

const authController = {
  async register(req, res) {
    const hash = await bcrypt.hash(req.body.password, parseInt(ROUNDS));
    req.body.password = hash;
    const result = await Users.add(req.body);
    console.log(result);
    res.status(201).json(result);
  },
  async login(req, res, next) {
    if (await bcrypt.compare(req.body.password, req.user.password)) {
      const token = tokenBuilder(req.user);
      res.status(200).json({
        message: `Welcome Back ${req.user.username}!`,
        token,
        user_id: req.user.user_id,
      });
    } else {
      next({ status: 401, message: "invalid password" });
    }
  },
};

module.exports = authController;
