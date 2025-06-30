const { sendJSON, getBody, getIdParam } = require("../routes/utils");
const { isValidPostInscriptionData } = require("../routes/validators/inscriptions");
const { createInscription } = require("../services/inscription_service");

// async function getStudents(req, res) {
//   try {
//     const students = await findAll();
//     sendJSON(res, 200, students);
//   } catch (error) {
//     console.error("Error getting courses:", error);
//     sendJSON(res, 500, { error: "Internal server error" });
//   }
// }

// async function getStudentById(req, res) {
//   try {
//     const id = getIdParam({ req, basePath: "/students" });

//     const student = await findStudent(id);

//     if (!student) {
//       return sendJSON(res, 404, { error: "Student not found" });
//     }

//     sendJSON(res, 200, student);
//   } catch (error) {
//     console.error("Error getting student:", error);
//     sendJSON(res, 500, { error: "Internal server error" });
//   }
// }

async function postInscription(req, res) {
  try {
    const body = await getBody(req);

    const { is_valid, message } = await isValidPostInscriptionData(body);
    if (!is_valid) {
      throw new Error(message);
    }

    await createInscription(body);

    sendJSON(res, 201, { message: "Inscripcion creado con éxito" });
  } catch (error) {
    console.error("Error en postInscription:", error.message);
    sendJSON(res, 400, { error: error.message });
  }
}

// async function putStudent(req, res) {
//   try {
//     const id = getIdParam({ req, basePath: "/students" });

//     const body = await getBody(req);
//     const { is_valid, message } = isValidPutStudentData(body);
//     if (!is_valid) {
//       throw new Error(message);
//     }

//     const updated = await updateStudent({ id, data: body });

//     if (!updated) {
//       return sendJSON(res, 404, { error: "Student not found" });
//     }

//     sendJSON(res, 200, { message: "Student actualizado con éxito" });
//   } catch (error) {
//     console.error("Error en putStudent:", error.message);
//     sendJSON(res, 400, { error: error.message });
//   }
// }

// async function deleteStudent(req, res) {
//   try {
//     const id = getIdParam({ req, basePath: "/students" });

//     const deleted = await deleteStudentById(id);

//     if (!deleted) {
//       return sendJSON(res, 404, { error: "Student not found" });
//     }

//     sendJSON(res, 200, { message: "Student eliminado con éxito" });
//   } catch (error) {
//     console.error("Error en deleteStudent:", error.message);
//     sendJSON(res, 400, { error: error.message });
//   }
// }

module.exports = {
  postInscription,
  // getStudents,
  // getStudentById,
  // putStudent,
  // deleteStudent,
};
