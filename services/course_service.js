const db = require("../db");

async function findAll() {
  try {
    const query = "SELECT * FROM courses ORDER BY id ASC";
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.log(error)
    throw new Error(error.message || "Internal server error");
  }
}

async function findCourse(id) {
  try {
    const query = `
      SELECT * FROM courses
      WHERE id = $1
    `;
    const values = [id];
  
    const result = await db.query(query, values);
    return result.rows[0];
  
  } catch (error) {
    console.log(error)
    throw new Error(error.message || "Internal server error");
  }
}


async function createCourse({ name, description, capacity }) {
  try {
    const query = `
      INSERT INTO courses (name, description, capacity)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, description || null, capacity];
  
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log(error)
    throw new Error(error.message || "Internal server error");
  }
}

async function updateCourse({id, data}) {
  try {
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
  
    values.push(id);
  
    const result = await db.query(query, values);
    return result.rows[0];
    
  } catch (error) {
    console.log(error)
    throw new Error(error.message || "Internal server error");
  }
}

async function deleteCourseById(id) {
  const query = `
    DELETE FROM courses
    WHERE id = $1
    RETURNING *;
  `;

  const values = [id];

  const result = await db.query(query, values);
  return result.rows[0]; // si no existía, devuelve undefined
}



module.exports = { findAll, findCourse, createCourse, updateCourse, deleteCourseById };