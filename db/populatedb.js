const { Client } = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const SQL = `

CREATE TABLE IF NOT EXISTS users (

id SERIAL PRIMARY KEY,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
username VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
membership_status BOOLEAN DEFAULT FALSE,
admin_status BOOLEAN DEFAULT FALSE

);

CREATE TABLE IF NOT EXISTS messages (

message_id SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
title VARCHAR(255) NOT NULL,
message TEXT NOT NULL,
timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

);
`;

async function main() {
  console.log("Seeding....");

  const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

  if (!connectionString) {
    console.error("Error: Error with connection string");
    process.exit(1);
  }

  const client = new Client({ connectionString });

  try {
    await client.connect();
    await client.query(SQL);
    // add basic admin user for testing
    const hashedPassword = await bcrypt.hash("password", 10);
    await client.query(
      `INSERT INTO users (first_name, last_name, username, password, membership_status, admin_status) 
      VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (username) DO NOTHING`,
      ["admin", "admin", "admin@admin.com", hashedPassword, true, true]
    );
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.end();
    console.log("Finished creating tables and adding test admin");
  }
}

main();
