const pool = require("./pool");

async function getAllMessages() {
  const queryText =
    "SELECT m.message_id, m.title, m.message, m.timestamp, u.first_name, u.last_name FROM messages m JOIN users u ON m.user_id = u.id ORDER BY m.timestamp DESC";

  try {
    const { rows } = await pool.query(queryText);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllMessages,
};
