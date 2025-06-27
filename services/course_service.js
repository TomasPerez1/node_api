const db = require("../db");

async function findAll() {
  const query = "SELECT * FROM courses ORDER BY id ASC";
  const result = await db.query(query);
  return result.rows;
}

async function findCourse(id) {
  const query = `
    SELECT * FROM courses
    WHERE id = $1
  `;

  const values = [id];

  const result = await db.query(query, values);
  return result.rows[0]; // puede ser undefined si no se encontró
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

async function updateCourse(id, data) {
  const { name, description, capacity } = data;

  const fields = [];
  const values = [];
  let i = 1;

  if (name !== undefined) {
    fields.push(`name = $${i++}`);
    values.push(name);
  }

  if (description !== undefined) {
    fields.push(`description = $${i++}`);
    values.push(description);
  }

  if (capacity !== undefined) {
    fields.push(`capacity = $${i++}`);
    values.push(capacity);
  }

  const query = `
    UPDATE courses
    SET ${fields.join(", ")}
    WHERE id = $${i}
    RETURNING *;
  `;

  values.push(id); // ID es el último parámetro

  const result = await db.query(query, values);
  return result.rows[0]; // null/undefined si no encontró el curso
}





module.exports = { findAll, findCourse, createCourse, updateCourse };