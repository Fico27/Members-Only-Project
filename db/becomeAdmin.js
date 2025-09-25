const pool = require("./pool");

async function becomeAdmin(user_id) {
  const client = await pool.connect();
  const queryText = `UPDATE users SET admin_status = true WHERE id = $1`;

  try {
    await pool.query("BEGIN");
    await pool.query(queryText, [user_id]);
    await pool.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  becomeAdmin,
};
