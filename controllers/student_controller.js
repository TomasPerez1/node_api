const {
  findAll,
  findStudent,
  createStudent,
  updateStudent,
  deleteCourseById,
} = require("../services/student_service");
const { sendJSON, getBody, getIdParam } = require("../routes/utils");
const {
  isValidPostStudentData,
  isValidPutStudentData
} = require("../routes/validators/students");

async function getStudents(req, res) {
  try {
    const students = await findAll();
    sendJSON(res, 200, students);
  } catch (error) {
    console.error("Error getting courses:", error);
    sendJSON(res, 500, { error: "Internal server error" });
  }
}

async function getStudentById(req, res) {
  try {
    const id = getIdParam({ req, basePath: "/students" });

    const student = await findStudent(id);

    if (!student) {
      return sendJSON(res, 404, { error: "Student not found" });
    }

    sendJSON(res, 200, student);
  } catch (error) {
    console.error("Error getting student:", error);
    sendJSON(res, 500, { error: "Internal server error" });
  }
}

async function postStudent(req, res) {
  try {
    const body = await getBody(req);

    const { is_valid, message } = isValidPostStudentData(body);
    if (!is_valid) {
      throw new Error(message);
    }

    await createStudent(body);

    sendJSON(res, 201, { message: "Curso creado con éxito" });
  } catch (error) {
    console.error("Error en postCourse:", error.message);
    sendJSON(res, 400, { error: error.message });
  }
}

async function putStudent(req, res) {
  try {
    const id = getIdParam({ req, basePath: "/students" });

    const body = await getBody(req);
    const { is_valid, message } = isValidPutStudentData(body);
    if (!is_valid) {
      throw new Error(message);
    }

    const updated = await updateStudent({ id, data: body });

    if (!updated) {
      return sendJSON(res, 404, { error: "Student not found" });
    }

    sendJSON(res, 200, { message: "Student actualizado con éxito" });
  } catch (error) {
    console.error("Error en putStudent:", error.message);
    sendJSON(res, 400, { error: error.message });
  }
}

// async function deleteCourse(req, res) {
//   try {
//     const id = getIdParam({ req, basePath: "/courses" });

//     const deleted = await deleteCourseById(id);

//     if (!deleted) {
//       return sendJSON(res, 404, { error: "Course not found" });
//     }

//     sendJSON(res, 200, { message: "Curso eliminado con éxito" });
//   } catch (error) {
//     console.error("Error en deleteCourse:", error.message);
//     sendJSON(res, 400, { error: error.message });
//   }
// }

module.exports = {
  getStudents,
  getStudentById,
  postStudent,
  putStudent,
};
