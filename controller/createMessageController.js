const db = require("../db/messageCreateQuery");

function getCreateMessage(req, res) {
  res.render("create-message");
}

async function postCreateMessage(req, res) {
  const { title, message } = req.body;

  try {
    await db.createMessage(req.user.id, title, message);
    return res.redirect("/messageboard");
  } catch (error) {
    console.error("Error Creating Message", error);
    return res.status(500).send("Server error while creating message.");
  }
}
module.exports = {
  getCreateMessage,
  postCreateMessage,
};
