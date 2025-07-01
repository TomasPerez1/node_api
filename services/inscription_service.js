const db = require("../db");
const { isValidInt } = require("../utils");

async function isValidId({table, id}) {
  const query = `
    SELECT * FROM ${table}
    WHERE id = $1
  `;
  const values = [id];

  const result = await db.query(query, values);
  return Boolean(result.rows[0]); 
}

async function isAlreadyInscripted({ student_id, course_id }) {
  const query = `
    SELECT * FROM inscriptions
    WHERE student_id = $1 AND course_id = $2
  `;
  const values = [student_id, course_id];

  const result = await db.query(query, values);
  
  return Boolean(result.rows[0]); 
}

async function hasCapacity({ course_id }) {
  const query = `
    SELECT * FROM courses
    WHERE id = $1 AND capacity > 0;
  `; // cpacity = 0;
  const values = [course_id];

  const result = await db.query(query, values);
  console.log("HAS", result.rows[0]);
  return Boolean(result.rows[0]); 
}

async function findAll() {
  const query = "SELECT * FROM inscriptions ORDER BY id ASC";
  const result = await db.query(query);
  return result.rows;
}

async function findInscription(id) {

  const query = `
    SELECT * FROM inscriptions
    WHERE id = $1
  `;
  const values = [id];

  const result = await db.query(query, values);
  
  return result.rows[0]; 
  
}


async function createInscription({ student_id, course_id }) {
  console.log("CREATE INSCRIPTION", student_id, course_id)
  const query = `
    INSERT INTO inscriptions (student_id, course_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [student_id, course_id];

  const result = await db.query(query, values);
  return result.rows[0];
  
}

async function deleteInscriptionsById(id) {
    const query = `
    DELETE FROM inscriptions
    WHERE id = $1
    RETURNING *;
    `;

    if(!isValidInt({int: id, min: 1, max: 999})) {
      throw new Error("Invalide ID type");
    }

    const values = [id];

    const result = await db.query(query, values);
    return result.rows[0];
}



module.exports = { findAll, findInscription, deleteInscriptionsById, isValidId, isAlreadyInscripted, hasCapacity, createInscription};