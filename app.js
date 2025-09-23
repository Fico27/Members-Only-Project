const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const loginRouter = require("./routes/loginRouter");
const signupRouter = require("./routes/signupRouter");

const app = express();

require("./config/passport");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", loginRouter);
app.use("/signup", signupRouter);

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("Listening on port 3000!");
});
