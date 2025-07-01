const process = require("process");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const db = require("../db");

async function seedAdmin() {

  const admin = {
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: process.env.ADMIN_ROLE,
  };

  try {
    const hashedPassword = bcrypt.hashSync(admin.password, 10);

    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING;
    `;

    const values = [admin.name, admin.email, hashedPassword, admin.role];

    await db.query(query, values);

    console.log("Usuario admin insertado");
    process.exit(0);
  } catch (error) {
    console.error("Error al insertar usuario admin:", error.message);
    process.exit(1);
  }
}

seedAdmin();
