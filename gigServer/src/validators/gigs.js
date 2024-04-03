const { body, param } = require("express-validator");

const validateAddGigData = [
  body("title", "title is required").not().isEmpty(),
  param("providerId", "author must be length 24").isLength({
    min: 24,
    max: 24,
  }),
  body("dateStart", "start date is required").not().isEmpty(),
  body("dateStart", "start date must be in this format YYYY-MM-DD").isDate(),
  body("timeStart", "start time is required").not().isEmpty(),
  body("timeStart", "time must be in this format HH:MM").isTime(),
  body("address", "address is required").optional().not().isEmpty(),
  body("address", "address must be between 1 and 100 characters")
    .optional()
    .isLength({ min: 1, max: 100 }),
  body("link", "link is required").optional().not().isEmpty(),
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
  validateIdInParams,
  validateProviderIdInParams,
};
