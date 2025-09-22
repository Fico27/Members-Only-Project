const pool = require("./pool");

async function createUser(fname, lname, username, password) {
  const client = await pool.connect();
  const queryText = `INSERT INTO users (first_name, last_name, username, password, membership_status, admin_status)
    VALUES ($1, $2, $3, $3, $4, $5)`;

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
