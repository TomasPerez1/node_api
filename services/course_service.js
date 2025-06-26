const db = require("../db");

async function findAll() {
  const query = "SELECT * FROM courses ORDER BY id ASC";
  const result = await db.query(query);
  return result.rows;
}

async function createCourse({ name, description, capacity }) {
  const query = `
    INSERT INTO courses (name, description, capacity)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  // place holders para mayor seguridad
  const values = [name, description || null, capacity];

  const result = await db.query(query, values);
  return result.rows[0];
}

module.exports = { findAll, createCourse };