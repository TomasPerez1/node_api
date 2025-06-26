const { getCourses, postCourse } = require("../controllers/course_controller.js");

function router(req, res) {
  if (req.pathname === "/courses") {
    if (req.method === "GET") {
      return getCourses(req, res);
    }
    else if (req.method === "POST") {
      return postCourse(req, res);
    }
    // else if (req.method === "PUT") {
    //   return postCourse(req, res);
    // }
    // else if (req.method === "DELETE") {
    //   return postCourse(req, res);
    // }
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
}

module.exports = { router };
