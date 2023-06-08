const { body, validationResult } = require("express-validator");
const mongodb = require("../db/mongodb");
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

validate.createTeamValidationRules = () => {
  return [
    // name must be a string and found in list of teams
    body("name")
      .notEmpty()
      .custom(async (team) => {
        if (!teams.includes(team)) {
          throw new Error("Team not found.");
        }
        try {
          const result = await mongodb
            .getDb()
            .db("MLB")
            .collection("teams")
            .find()
            .toArray();
          const teamsCreated = result.map((team) => team.name);
          console.log("teams created: ");
          console.log(teamsCreated);
          if (teamsCreated.includes(team)) {
            throw new Error("Team already exists.");
          }
          return Promise.resolve();
        } catch (err) {
          throw err;
        }
      }),
    // location must be string
    body("location", "Location is required").notEmpty().isString(),
    // stadium name must be a string
    body("stadium", "Stadium is required").notEmpty().isString(),
    // World Series wins must be int and greater than or equal to 0
    body("world_series_wins", "Required field WS wins")
      .notEmpty()
      .isInt({ gt: -1 }),
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

validate.updateTeamValidationRules = () => {
  return [
    // name must be a string and found in list of teams
    body("name")
      .notEmpty()
      .custom(async (team) => {
        if (!teams.includes(team)) {
          throw new Error("Team not found.");
        }
      }),
    // location must be string
    body("location", "Location is required").notEmpty().isString(),
    // stadium name must be a string
    body("stadium", "Stadium is required").notEmpty().isString(),
    // World Series wins must be int and greater than or equal to 0
    body("world_series_wins", "Required field WS wins")
      .notEmpty()
      .isInt({ gt: -1 }),
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
