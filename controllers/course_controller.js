const {
  findAll,
  findCourse,
  createCourse,
  updateCourse,
  deleteCourseById,
} = require("../services/course_service");
const { sendJSON, getBody, getIdParam } = require("../routes/utils");
const {
  isValidPostCourseData,
  isValidPutCourseData,
} = require("../routes/validators/courses");

async function getCourses(req, res) {
  try {
    const courses = await findAll();
    sendJSON(res, 200, courses);
  } catch (error) {
    console.error("Error getting courses:", error);
    sendJSON(res, 500, { error: "Internal server error" });
  }
}

async function getCourseById(req, res) {
  try {
    const id = getIdParam({ req, basePath: "/courses" });

    const course = await findCourse(id);

    if (!course) {
      return sendJSON(res, 404, { error: "Course not found" });
    }

    sendJSON(res, 200, course);
  } catch (error) {
    console.error("Error getting course:", error);
    sendJSON(res, 500, { error: "Internal server error" });
  }
}

async function postCourse(req, res) {
  try {
    const body = await getBody(req);

    const { is_valid, message } = isValidPostCourseData(body);
    if (!is_valid) {
      throw new Error(message);
    }

    await createCourse(body);

    sendJSON(res, 201, { message: "Curso creado con éxito" });
  } catch (error) {
    console.error("Error en postCourse:", error.message);
    sendJSON(res, 400, { error: error.message });
  }
}

async function putCourse(req, res) {
  try {
    const id = getIdParam({ req, basePath: "/courses" });

    const body = await getBody(req);
    const { is_valid, message } = isValidPutCourseData(body);
    if (!is_valid) {
      throw new Error(message);
    }

    const updated = await updateCourse({ id, data: body });

    if (!updated) {
      return sendJSON(res, 404, { error: "Course not found" });
    }

    sendJSON(res, 200, { message: "Curso actualizado con éxito" });
  } catch (error) {
    console.error("Error en putCourse:", error.message);
    sendJSON(res, 400, { error: error.message });
  }
}

async function deleteCourse(req, res) {
  try {
    const id = getIdParam({ req, basePath: "/courses" });

    const deleted = await deleteCourseById(id);

    if (!deleted) {
      return sendJSON(res, 404, { error: "Course not found" });
    }

    sendJSON(res, 200, { message: "Curso eliminado con éxito" });
  } catch (error) {
    console.error("Error en deleteCourse:", error.message);
    sendJSON(res, 400, { error: error.message });
  }
}

module.exports = {
  getCourses,
  getCourseById,
  postCourse,
  putCourse,
  deleteCourse,
};
