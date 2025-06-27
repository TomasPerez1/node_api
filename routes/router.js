const { getCourses, getCourseById, postCourse, putCourse } = require("../controllers/course_controller.js");

function router(req, res) {
  const path = req.pathname;

  if (path === "/courses") {
    if (req.method === "GET") {
      return getCourses(req, res);
    } else if (req.method === "POST") {
      return postCourse(req, res);
    }
  }

  if (path.startsWith("/courses/")) {
    if (req.method === "GET") {
      return getCourseById(req, res);
    }
    
    if (req.method === "PUT") {
      return putCourse(req, res);
    }
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
}

module.exports = { router };
