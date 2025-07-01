const db = require("../db");
const bcrypt = require("bcryptjs")
const { isValidInt } = require("../utils");

async function findAll() {
  const query = "SELECT * FROM users ORDER BY id ASC";
  const result = await db.query(query);
  return result.rows;
}

async function findUser(id) {

  const query = `
    SELECT * FROM users
    WHERE id = $1
  `;
  const values = [id];

  const result = await db.query(query, values);
  
  return result.rows[0]; 
  
}


async function createUser({ name, email, password }) {
  
  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role;
  `;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const values = [name, email, hashedPassword, "user"];

  const result = await db.query(query, values);
  return result.rows[0];
  
}

async function updateStudent({id, data}) {
    console.log("id recibiod: ", id)

    if(!isValidInt({int: id, min: 1, max: 999})) {
      throw new Error("Invalide ID type");
    }

    const { name, email, age } = data;
  
    const fields = [];
    const values = [];
    let i = 1;
  
    if (name !== undefined) {
      fields.push(`name = $${i++}`);
      values.push(name);
    }
  
    if (email !== undefined) {
      fields.push(`email = $${i++}`);
      values.push(email);
    }
  
    if (age !== undefined) {
      fields.push(`age = $${i++}`);
      values.push(age);
    }
  
    const query = `
      UPDATE users
      SET ${fields.join(", ")}
      WHERE id = $${i}
      RETURNING *;
    `;
  
    values.push(id);
  
    const result = await db.query(query, values);
    return result.rows[0];
    
  
}

async function deleteStudentById(id) {
    const query = `
    DELETE FROM users
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



module.exports = { findAll, findUser, createUser, updateStudent, deleteStudentById };