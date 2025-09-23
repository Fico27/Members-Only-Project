const passport = require("passport");

function getLogin(req, res) {
  return res.render("log-in", { errors: [] });
}

function postLogin(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/dashboard", //fix this to point to homepage/message board when created.
    failureRedirect: "/",
    failureFlash: false,
  })(req, res, next);
}

module.exports = {
  getLogin,
  postLogin,
};
