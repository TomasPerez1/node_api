const {
  findAll,
  findStudent,
  createStudent,
  updateStudent,
  deleteStudentById,
} = require("../services/user_service");
const { sendJSON, getBody, getIdParam } = require("../routes/utils");
const {
  isValidPostStudentData,
  isValidPutStudentData
} = require("../routes/validators/students");

async function getUsers(req, res) {
  try {
    const users = await findAll();
    sendJSON(res, 200, users);
  } catch (error) {
    console.error("Error getting users:", error);
    sendJSON(res, 500, { error: "Internal server error" });
  }
}

async function getStudentById(req, res) {
  try {
    const id = getIdParam({ req, basePath: "/users" });

    const student = await findStudent(id);

    if (!student) {
      return sendJSON(res, 404, { error: "Student not found" });
    }

    sendJSON(res, 200, student);
  } catch (error) {
    console.error("Error getting users:", error);
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

    sendJSON(res, 201, { message: "user creado con éxito" });
  } catch (error) {
    console.error("Error en postUser:", error.message);
    sendJSON(res, 400, { error: error.message });
  }
}

async function putStudent(req, res) {
  try {
    const id = getIdParam({ req, basePath: "/users" });

    const body = await getBody(req);
    const { is_valid, message } = isValidPutStudentData(body);
    if (!is_valid) {
      throw new Error(message);
    }

    const updated = await updateStudent({ id, data: body });

    if (!updated) {
      return sendJSON(res, 404, { error: "User not found" });
    }

    sendJSON(res, 200, { message: "User actualizado con éxito" });
  } catch (error) {
    console.error("Error en putUser:", error.message);
    sendJSON(res, 400, { error: error.message });
  }
}

async function deleteStudent(req, res) {
  try {
    const id = getIdParam({ req, basePath: "/users" });

    const deleted = await deleteStudentById(id);

    if (!deleted) {
      return sendJSON(res, 404, { error: "Student not found" });
    }

    sendJSON(res, 200, { message: "User eliminado con éxito" });
  } catch (error) {
    console.error("Error en deleteUser:", error.message);
    sendJSON(res, 400, { error: error.message });
  }
}

module.exports = {
  getUsers,
  // getUserById,
  // postUser,
  // putUser,
  // deleteUser,
};
