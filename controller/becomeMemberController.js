const db = require("../db/becomeMember");

function getBecomeMember(req, res) {
  res.render("become-member", { message: "" });
}

async function postBecomeMember(req, res) {
  const user = req.user;
  const { password } = req.body;
  const secretPassword = "greedisgood";
  if (password === secretPassword) {
    try {
      await db.becomeMember(user);
      return res.redirect("/messageboard");
    } catch (error) {
      console.error("Error becoming member", error);
      return res.status(500).send("Error becoming a member. Try again.");
    }
  } else {
    return res.render("become-member", {
      message: "Incorrect password. You aren't worthy...",
    });
  }
}

module.exports = {
  getBecomeMember,
};
