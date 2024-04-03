const { body } = require("express-validator");

const validateRegistrationData = [
  body("name", "name is required").not().isEmpty(),
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

// To do make actual validate patch data
const validatePatchData = [
  // body("name", "name patch error").optional(),
  // body("biography", "biography has a limit of 300 characters")
  //   .optional()
  //   .isLength({ max: 300 }),
  // body("phoneNumber", "phone number patch error").optional(),
  // body("email", "email patch error").optional(),
  // body("email", "valid email is required").isEmail(),
  // body("password", "password patch error").optional(),
  // body("password", "password min is 8 and max is 50").isLength({
  //   min: 8,
  //   max: 50,
  // }),
];

const validateParamId = [
  param("id", "id is required").not().isEmpty(),
  param("id", "id is invalid").isLength({ min: 24, max: 24 }),
];

module.exports = {
  validateRegistrationData,
  validatePatchData,
  validateParamId,
};
