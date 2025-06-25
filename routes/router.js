const { getCourses } = require("../controllers/courses.js");

function router(req, res) {
  if (req.method === "GET" && req.pathname === "/courses") {
    return getCourses(req, res);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
}

module.exports = { router };
