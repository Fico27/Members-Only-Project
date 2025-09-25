const db = require("../db/becomeMember");
const db2 = require("../db/becomeAdmin");

function getBecomeMember(req, res) {
  res.render("become-member", { message: "" });
}

async function postBecomeMember(req, res) {
  const user = req.user;
  const { password } = req.body;
  const secretPassword = "greedisgood";
  if (password === secretPassword) {
    try {
      await db.becomeMember(user.id);
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

async function postBecomeAdmin(req, res) {
  const user = req.user;
  const { adminPassword } = req.body.adminpassword;
  const secretAdminPassword = "allyourbasearebelongtous";
  if (adminPassword === secretAdminPassword) {
    try {
      await db2.becomeAdmin(user.id);
      return res.redirect("/messageboard");
    } catch (error) {
      console.error("Error becoming Admin", error);
      return res.status(500).send("Error becoming an admin. Try again.");
    }
  } else {
    return res.render("become-member", {
      message:
        "Incorrect password. You aren't worthy... to become one of the message board gods",
    });
  }
}

module.exports = {
  getBecomeMember,
  postBecomeMember,
  postBecomeAdmin,
};
