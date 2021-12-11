const { itemSchema } = require("../schemaValidation");

const bodyValidation = async (req, res, next) => {
  try {
    req.body = await itemSchema.validate(req.body, {
      stripUnknown: true,
    });
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

module.exports = { bodyValidation };
