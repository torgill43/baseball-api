const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config;

const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.clientID,
  issuerBaseURL: process.env.issuerBaseURL,
};

// auth router attaches /login, /logout, and /callback routes to base url
router.use(auth(config));
// req.isAuthenticated is provided from the auth router
router.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

router.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// Route for Swagger UI
router.use("/", require("./swagger"));
// router.use("/", require("./swagger"));

// Player Route
router.use("/baseball-player", requiresAuth(), require("./playerRoute"));
// Team Route
router.use("/baseball-team", requiresAuth(), require("./teamRoute"));

router.get("/", (req, res) => {
  res.send("Baseball API");
});

module.exports = router;
