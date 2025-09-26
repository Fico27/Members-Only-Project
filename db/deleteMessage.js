const pool = require("../db/pool");

async function deleteMessage(message_id) {
  const client = await pool.connect();
  const queryText = `DELETE FROM messages WHERE message_id = $1`;

  try {
    await client.query("BEGIN");
    await client.query(queryText, [message_id]);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.release();
  }
}

module.exports = {
  deleteMessage,
};
