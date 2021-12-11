// const Events = require("./events-model");
const jwt = require("jsonwebtoken");
const Events = require("./events-model");
const Users = require("../auth/auth-model");
const { eventSchema, guestSchema, itemSchema } = require("../schemaValidation");
const JWT_SECRET = require("../secrets");

const bodyValidation = async (req, res, next) => {
  try {
    req.body = await eventSchema.validate(req.body, {
      stripUnknown: true,
    });
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

const restriction = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      next({ status: 401, message: "Token authentication error" });
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

const only = (req, res, next) => {
  if (req.decoded.subject === req.params.user_id) next();
  else
    next({ status: 403, message: "You are not allowed access to this data" });
};

const checkUserId = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      next({ status: 400, message: "must include a user_id" });
    }
    const check = await Users.findBy({ user_id });
    if (!check) {
      next({ status: 400, message: "user ID does not exist!" });
    } else {
      next();
    }
  } catch (err) {
    next({ status: 400, message: "user ID does not exist!" });
  }
};

const checkEventId = async (req, res, next) => {
  try {
    const { event_id } = req.params;
    const check = await Events.getBy({ event_id }).first();
    if (!check) {
      next({ status: 400, message: "Event ID does not exist!" });
    } else {
      next();
    }
  } catch (err) {
    next({ status: 400, message: "Event ID does not exist!" });
  }
};

const checkGuestBody = async (req, res, next) => {
  try {
    req.body = await guestSchema.validate(req.body, {
      stripUnknown: true,
    });
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};
const checkItemBody = async (req, res, next) => {
  try {
    req.body = await itemSchema.validate(req.body, {
      stripUnknown: true,
    });
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};
module.exports = {
  bodyValidation,
  restriction,
  only,
  checkUserId,
  checkEventId,
  checkGuestBody,
  checkItemBody,
};
