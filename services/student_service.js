const db = require("../db");
const { isValidInt } = require("../utils");

async function findAll() {
  const query = "SELECT * FROM students ORDER BY id ASC";
  const result = await db.query(query);
  return result.rows;
}

async function findStudent(id) {

  const query = `
    SELECT * FROM students
    WHERE id = $1
  `;
  const values = [id];

  const result = await db.query(query, values);
  
  return result.rows[0]; 
  
}


async function createStudent({ name, email, age }) {
  const query = `
    INSERT INTO students (name, email, age)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [name, email, age];

  const result = await db.query(query, values);
  return result.rows[0];
  
}

async function updateCourse({id, data}) {
  
    if(!isValidInt(id)) {
      throw new Error("Invalide ID type");
    }

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
    
  
}

async function deleteCourseById(id) {
    const query = `
    DELETE FROM courses
    WHERE id = $1
    RETURNING *;
    `;

    if(!isValidInt(id)) {
      throw new Error("Invalide ID type");
    }

    const values = [id];

    const result = await db.query(query, values);
    return result.rows[0]; // si no existía, devuelve undefined
}



module.exports = { findAll, findStudent, createStudent, updateCourse, deleteCourseById };