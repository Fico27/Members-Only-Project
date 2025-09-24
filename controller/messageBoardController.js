const db = require("../db/queryMessages");

async function getMessageBoard(req, res) {
  try {
    const messages = await db.getAllMessages();

    return res.render("message-board", { messages, user: req.user });
  } catch (error) {
    console.error("Error getting messages", error);
    return res.status(500).send("Server error");
  }
}

module.exports = {
  getMessageBoard,
};
