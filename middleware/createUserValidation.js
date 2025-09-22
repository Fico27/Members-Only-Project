const { body, validationResult } = require("express-validator");

const createUserValidation = [
  body("fname").trim().notEmpty().withMessage("First name is required"),
  body("lname").trim().notEmpty().withMessage("Last name is required"),
  body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("cpassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match!");
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("sign-up", {
        errors: errors.array(),
        formInfo: req.body,
      });
    }
    next();
  },
];

module.exports = createUserValidation;
