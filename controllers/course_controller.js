const { findAll } = require("../services/course_service");
const { getBody } = require("../routes/utils")
const { isValidPostCourseData } = require("../routes/validators/courses")

async function getCourses(req, res) {
  try {
    const courses = await findAll();
    // se recibe y se retorna como JSON y se re
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(courses));
  } catch (error) {
    console.error("Error getting courses:", error);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
}

async function postCourse(req, res) {
  try {
    const body = await getBody(req);

    const {is_valid, message} = isValidPostCourseData(body);
    if (!is_valid) {
      throw new Error(message);
    }

    // Llamada al modelo para insertar el curso

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Curso creado con éxito" }));
  } catch (error) {
    console.error("Error en postCourse:", error.message);

    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}


module.exports = { getCourses, postCourse };