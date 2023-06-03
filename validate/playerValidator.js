const { body, validationResult } = require("express-validator");
const validate = {};

const teams = [
  "Arizona Diamondbacks",
  "Atlanta Braves",
  "Baltimore Orioles",
  "Boston Red Sox",
  "Chicago Cubs",
  "Chicago White Sox",
  "Cincinnati Reds",
  "Cleveland Guardians",
  "Colorado Rockies",
  "Detroit Tigers",
  "Houston Astros",
  "Kansas City Royals",
  "Los Angeles Angels",
  "Los Angeles Dodgers",
  "Miami Marlins",
  "Milwaukee Brewers",
  "Minnesota Twins",
  "New York Mets",
  "New York Yankees",
  "Oakland Athletics",
  "Philadelphia Phillies",
  "Pittsburgh Pirates",
  "San Diego Padres",
  "San Francisco Giants",
  "Seattle Mariners",
  "St. Louis Cardinals",
  "Tampa Bay Rays",
  "Texas Rangers",
  "Toronto Blue Jays",
  "Washington Nationals",
];

validate.createPlayerValidationRules = () => {
  return [
    // name must be a string
    body("name", "Name is required.").notEmpty().isString(),
    // age must be int
    body("age", "Age is required").notEmpty().isInt({ min: 15 }),
    // hometown must be a string
    body("hometown", "Hometown is required").notEmpty().isString(),
    // team must be a string and in list of teams
    body("team")
      .notEmpty()
      .custom(async (team) => {
        if (!teams.includes(team)) {
          throw new Error("Team not found.");
        }
      }),
    // handedness must be one of the following: L/R, R/L, R/R, L/L,
    body("handedness", "Required field - check for capitalization")
      .notEmpty()
      .matches(/^(L\/R|R\/L|R\/R|L\/L|S\/L|S\/R)$/),
    // career homeruns must be int
    body("hrs", "Required field hr").notEmpty().isInt({ gt: 0 }),
    // average is a float and less than 1
    body("average", "Required field flt").notEmpty().isFloat({ lt: 1.0 }),
  ];
};

validate.validateCreate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

validate.updatePlayerValidationRules = () => {
  return [
    // name must be a string
    body("name", "Name is required.").notEmpty().isString(),
    // age must be int
    body("age", "Age is required").notEmpty().isInt({ min: 15 }),
    // hometown must be a string
    body("hometown", "Hometown is required").notEmpty().isString(),
    // team must be a string and in list of teams
    body("team")
      .notEmpty()
      .custom(async (team) => {
        if (!teams.includes(team)) {
          throw new Error("Team not found.");
        }
      }),
    // handedness must be one of the following: L/R, R/L, R/R, L/L,
    body("handedness", "Required field - check for capitalization")
      .notEmpty()
      .matches(/^(L\/R|R\/L|R\/R|L\/L|S\/L|S\/R)$/),
    // career homeruns must be int
    body("hrs", "Required field hr").notEmpty().isInt({ gt: 0 }),
    // average is a float and less than 1
    body("average", "Required field flt").notEmpty().isFloat({ lt: 1.0 }),
  ];
};

validate.validateUpdate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

module.exports = validate;
