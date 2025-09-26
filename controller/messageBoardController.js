const db = require("../db/queryMessages");
const db2 = require("../db/deleteMessage");

async function getMessageBoard(req, res) {
  try {
    const messages = await db.getAllMessages();

    return res.render("message-board", { messages, user: req.user });
  } catch (error) {
    console.error("Error getting messages", error);
    return res.render("message-board", {
      messages: [],
      user: req.user,
      error: "Failed to load messages",
    });
  }
}

async function postDeleteMessage(req, res) {
  const { message_id } = req.params;
  const user = req.user;
  if (!user || !user.admin_status) {
    return res.redirect("/messageboard");
  }
  try {
    const deleted = await db2.deleteMessage(message_id);
    if (deleted === 0) {
      const messages = await db.getAllMessages();
      return res.render("message-board", {
        messages,
        user,
        error: "Message not found",
      });
    }
    return res.redirect("/messageboard");
  } catch (error) {
    console.error("Error deleting message:", error.stack);
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
