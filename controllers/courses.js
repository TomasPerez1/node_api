const db = require("../db")

async function handleCursos(req, res) {
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const query = 'SELECT * FROM users';
    const result = await db.query(query);
    console.log(result);
    res.end(JSON.stringify({ message: "GET /cursos OK" }));
  } else {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Método no permitido" }));
  }
}

module.exports = { handleCursos };
