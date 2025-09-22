const pool = require("./pool");

//createUser Creates a basic user that has no membership status
// or admin status.
async function createUser(fname, lname, username, password) {
  const client = await pool.connect();
  const queryText = `INSERT INTO users (first_name, last_name, username, password, membership_status, admin_status)
    VALUES ($1, $2, $3, $4, $5, $6)`;

  try {
    await client.query("BEGIN");
    await client.query(queryText, [
      fname,
      lname,
      username,
      password,
      false,
      false,
    ]);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  createUser,
};
