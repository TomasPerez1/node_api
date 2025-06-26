
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

module.exports = { setHeader, getBody }