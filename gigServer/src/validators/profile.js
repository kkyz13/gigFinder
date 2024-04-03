const { param } = require("express-validator");

const validateParamId = [
  param("id", "id is required").not().isEmpty(),
  param("id", "id is invalid").isLength({ min: 24, max: 24 }),
];

module.exports = {
  validateParamId,
};
