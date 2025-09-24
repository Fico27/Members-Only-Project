const passport = require("passport");

function getLogin(req, res) {
  return res.render("log-in", { errors: [] });
}

function postLogin(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).render("log-in", {
        errors: [{ msg: info?.message || "Invalid credentials" }],
      });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect("/messageboard");
    });
  })(req, res, next);
}

module.exports = {
  getLogin,
  postLogin,
};
