const { body, param } = require("express-validator");

const validateRegistrationData = [
  body("name", "name is required and limit of 100 characters")
    .not()
    .isEmpty()
    .isLength({ min: 1, max: 100 }),
  body("biography", "biography has a limit of 300 characters")
    .optional()
    .isLength({ max: 300 }),
  body("phoneNumber", "phone number is required").not().isEmpty(),
  body("email", "email is required").not().isEmpty(),
  body("email", "valid email is required").isEmail(),
  body("password", "password is required").not().isEmpty(),
  body("password", "password min is 8 and max is 50").isLength({
    min: 8,
    max: 50,
  }),
];

const validateLoginData = [
  body("email", "email is required").not().isEmpty(),
  body("email", "valid email is required").isEmail(),
  body("password", "password is required").not().isEmpty(),
  body("password", "password min is 8 and max is 50").isLength({
    min: 8,
    max: 50,
  }),
];

// To do make actual validate patch data
const validatePatchData = [
  body("name", "name is required and limit of 100 characters")
    .optional()
    .isLength({ min: 1, max: 100 }),
  body("biography", "biography has a limit of 300 characters")
    .optional()
    .isLength({ max: 300 }),
  body("email", "valid email is required").optional().isEmail(),
  body("password", "password min is 8 and max is 50").optional().isLength({
    min: 8,
    max: 50,
  }),
];

const validateParamId = [
  param("id", "id is required").not().isEmpty(),
  param("id", "id is invalid").isLength({ min: 24, max: 24 }),
];

module.exports = {
  validateRegistrationData,
  validateLoginData,
  validatePatchData,
  validateParamId,
};
