const { findAll, findCourse, createCourse, updateCourse } = require("../services/course_service");
const { getBody, getIdParam } = require("../routes/utils")
const { isValidPostCourseData, isValidPutCourseData } = require("../routes/validators/courses")

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

async function getCourseById(req, res) {
  try {
    const id = getIdParam({req, basePath: "/courses"}); 

    const course = await findCourse(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(course));
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

    await createCourse(body);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Curso creado con éxito" }));
  } catch (error) {
    console.error("Error en postCourse:", error.message);

    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}

async function putCourse(req, res) {
  try {
    const body = await getBody(req);
    // console.log(body)
    const {is_valid, message} = isValidPutCourseData(body);
    if (!is_valid) {
      throw new Error(message);
    }

    await updateCourse(body);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Curso actualizado con éxito" }));
  } catch (error) {
    console.error("Error en putCourse:", error.message);

    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}

module.exports = { getCourses, getCourseById, postCourse, putCourse };