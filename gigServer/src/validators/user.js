const { body: param } = require("express-validator");

const validateParamId = [param("id", "id is required").not().isEmpty()];

module.exports = {
  validateParamId,
};
