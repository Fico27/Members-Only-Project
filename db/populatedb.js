const { Client } = require("pg");
require("dotenv").config();

const SQL = `

CREATE TABLE IF NOT EXISTS users (

id SERIAL PRIMARY KEY,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
username VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
membership_status BOOLEAN DEFAULT FALSE,
admin_status BOOLEAN DEFAULT FALSE,

);

CREATE TABLE IF NOT EXISTS messages (

message_id SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
title VARCHAR(255) NOT NULL,
message TEXT NOT NULL,
timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

);

`;
