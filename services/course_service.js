const db = require("../db");

async function findAll() {
  const query = "SELECT * FROM courses ORDER BY id ASC";
  const result = await db.query(query);
  return result.rows;
}

module.exports = { findAll };