const db = require("../db/userCreateQuery");
const bcrypt = require("bcryptjs");

function getSignup(req, res) {
  try {
    return res.render("sign-up", { errors: [], formInfo: {} });
  } catch (error) {
    res.status(500).send("Server Error: Page not loaded");
  }
}

async function postSignup(req, res) {
  const { fname, lname, email, password } = req.body;

  // Need to hash the password and make sure the passwords match.
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await db.createUser(fname, lname, email, hashedPassword);
    return res.redirect("/");
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send("Error creating user. Please contact support");
  }
}

module.exports = {
  getSignup,
  postSignup,
};
