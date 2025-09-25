const db = require("../db/becomeAdmin");

function getBecomeAdmin(req, res) {
  res.render("become-admin", { message: "" });
}

async function postBecomeAdmin(req, res) {
  const user = req.user;
  const { password } = req.body;
  const secretAdminPassword = "allyourbasearebelongtous";
  if (password === secretAdminPassword) {
    try {
      await db.becomeAdmin(user.id);
      return res.redirect("/messageboard");
    } catch (error) {
      console.error("Error becoming Admin", error);
      return res.status(500).send("Error becoming an admin. Try again.");
    }
  } else {
    return res.render("become-admin", {
      message:
        "Incorrect password. You aren't worthy... to become one of the message board gods",
    });
  }
}

module.exports = {
  getBecomeAdmin,
  postBecomeAdmin,
};
