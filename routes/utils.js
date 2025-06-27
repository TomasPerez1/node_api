
function setHeader(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
}

function getBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (err) {
        reject(new Error("Invalid JSON"));
      }
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
}

function getIdParam({req, basePath}) {
  const pathParts = req.pathname.split("/").filter(Boolean); // quita strings vacíos

  // Verificamos que la ruta tenga al menos dos segmentos y coincida con la base
  if (pathParts[0] !== basePath.replace("/", "") || !pathParts[1]) {
    throw new Error("Invalid or missing ID in URL");
  }

  const id = parseInt(pathParts[1], 10);

  if (isNaN(id) || id <= 0) {
    throw new Error("ID must be a valid positive integer");
  }

  return id;
}

module.exports = { setHeader, getBody, getIdParam }