const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");

//For me to keep workflow in mind...
// I need to find the user if exists
// compare password entered
//set up to serialize user (meaning store user data)
// set up to deserialize user to get that info

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const result = await pool.query(
          `SELECT * FROM users WHERE username = $1`,
          [email]
        );
        const user = result.rows[0];
        // learning - The next two if statements are to deny access if username or password mistach
        if (!user) {
          return done(null, false, { message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return done(null, false, { message: "Invalid username or pasword" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

//saves user information
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//gets serialized information
passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = result.rows[0];
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
