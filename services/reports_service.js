const db = require("../db");
const { isValidInt } = require("../utils");

async function getCoursesWithIncriptions() {
  const query = `
    SELECT
      c.id,
      c.name,
      c.capacity,
      COUNT(i.id)::INT AS amount_of_inscriptions,
      ROUND(
        (COUNT(i.id)::decimal / c.capacity) * 100
      )::INT AS percentage_occupancy
    FROM courses c
    LEFT JOIN inscriptions i ON c.id = i.course_id
    GROUP BY c.id, c.name, c.capacity
    ORDER BY percentage_occupancy DESC;
  `;

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
  
  return result.rows[0]; 
  
}


async function createCourse({ name, description, capacity }) {
  const query = `
    INSERT INTO courses (name, description, capacity)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [name, description || null, capacity];

  const result = await db.query(query, values);
  return result.rows[0];
  
}

async function updateCourse({id, data}) {
  
    if(!isValidInt({int: id, min: 1, max: 999})) {
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

    if(!isValidInt({int: id, min: 1, max: 999})) {
      throw new Error("Invalide ID type");
    }

    const values = [id];

    const result = await db.query(query, values);
    return result.rows[0]; // si no existía, devuelve undefined
}



module.exports = { getCoursesWithIncriptions, findCourse, createCourse, updateCourse, deleteCourseById };