const { body, validationResult } = require("express-validator");
const validate = {}


validate.createPlayerValidationRules = () => {
  return [
    // name must be a string
    body("name").notEmpty()
    // username must be an email
    body("username").isEmail(),
    // password must be at least 5 chars long
    body("password").isLength({ min: 5 }),
  ];
};

validate.val = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};

const { userValidationRules, validate.val } = require("./validator.js");
app.post("/user", userValidationRules(), validate, (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  }).then((user) => res.json(user));
});
