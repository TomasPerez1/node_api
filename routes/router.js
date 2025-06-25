const { handleCursos } = require("../controllers/cursos");

function router(req, res) {
  if (req.pathname.startsWith("/cursos")) {
    return handleCursos(req, res);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Ruta no encontrada" }));
}

module.exports = { router };