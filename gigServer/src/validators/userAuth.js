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

module.exports = {
  validateRegistrationData,
};
