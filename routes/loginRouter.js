const { Router } = require("express");
const loginRouter = Router();

// Placeholder for now until i build out the controller
loginRouter.get("/", (req, res) => {
  return res.render("log-in");
});

module.exports = loginRouter;
