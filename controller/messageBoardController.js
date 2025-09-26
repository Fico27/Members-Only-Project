const db = require("../db/queryMessages");
const db2 = require("../db/deleteMessage");

async function getMessageBoard(req, res) {
  try {
    const messages = await db.getAllMessages();

    return res.render("message-board", { messages, user: req.user });
  } catch (error) {
    console.error("Error getting messages", error);
    return res.status(500).send("Server error");
  }
}

async function postDeleteMessage(req, res) {
  const { message_id } = req.params;
  const { user } = req.user;
  try {
    await db2.deleteMessage(message_id);

    return res.redirect("/messageboard");
  } catch (error) {
    console.error("Error Deleting message", error);
    const messages = await db.getAllMessages();
    return res.render("message-board", {
      messages,
      user,
      error: "Failed to delete message",
    });
  }
}

module.exports = {
  getMessageBoard,
  postDeleteMessage,
};
