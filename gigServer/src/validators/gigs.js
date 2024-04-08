const { body, param } = require("express-validator");

const validateAddGigData = [
  body("title", "title is required").not().isEmpty(),
  body("dateTimeStart", "start date and time is required").not().isEmpty(),
  body("address", "address must be between 1 and 100 characters")
    .optional()
    .isLength({ min: 0, max: 100 }),
  body("description", "description must be less that 1000 characters")
    .optional()
    .isLength({ max: 1000 }),
];

const validateUpdateGigData = [
  body("title", "title is required").optional().not().isEmpty(),
  body("dateTimeStart", "start date and time is required")
    .optional()
    .not()
    .isEmpty(),
  body("address", "address must be between 1 and 100 characters")
    .optional()
    .isLength({ min: 0, max: 100 }),
  body("description", "description must be less that 1000 characters")
    .optional()
    .isLength({ max: 1000 }),
];

const validateIdInParams = [
  param("id", "id must be length 24").isLength({
    min: 24,
    max: 24,
  }),
];

const validateProviderIdInParams = [
  param("providerId", "providerId must be length 24").isLength({
    min: 24,
    max: 24,
  }),
];

module.exports = {
  validateAddGigData,
  validateUpdateGigData,
  validateIdInParams,
  validateProviderIdInParams,
};
