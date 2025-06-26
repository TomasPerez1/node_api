const { findAll } = require("../services/course_service");

async function getCourses(req, res) {
  try {
    const courses = await findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(courses));
  } catch (error) {
    console.error("Error getting courses:", error);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
}

module.exports = { getCourses };