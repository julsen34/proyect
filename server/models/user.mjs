// server/models/user.mjs

import pool from '../db.js';

async function findUserByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

async function createUser({ nombre, email, password }) {
  const [result] = await pool.query('INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)', [nombre, email, password]);
  return result.insertId;
}

export { findUserByEmail, createUser };
