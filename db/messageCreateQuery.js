const pool = require("./pool");

async function createMessage(user_id, title, message) {
  const client = await pool.connect();
  const queryText = `INSERT INTO messages (user_id, title, message)
VALUES ($1, $2, $3);`;

  try {
    await client.query("BEGIN");
    await client.query(queryText, [user_id, title, message]);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.release();
  }
}

module.exports = {
  createMessage,
};
