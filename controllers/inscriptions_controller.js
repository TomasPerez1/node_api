const { sendJSON, getBody, getIdParam } = require("../routes/utils");
const { isValidPostInscriptionData } = require("../routes/validators/inscriptions");
const { createInscription, findAll, findInscription, deleteInscriptionsById } = require("../services/inscription_service");

async function getInscriptions(req, res) {
  try {
    const students = await findAll();
    sendJSON(res, 200, students);
  } catch (error) {
    console.error("Error getting inscriptions:", error);
    sendJSON(res, 500, { error: "Internal server error" });
  }
}

async function getInscriptionById(req, res) {
  try {
    const id = getIdParam({ req, basePath: "/inscriptions" });

    const inscription = await findInscription(id);

    if (!inscription) {
      return sendJSON(res, 404, { error: "Inscription not found" });
    }

    sendJSON(res, 200, inscription);
  } catch (error) {
    console.error("Error getting Inscription:", error);
    sendJSON(res, 500, { error: "Internal server error" });
  }
}

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

async function deleteInscription(req, res) {
  try {
    const id = getIdParam({ req, basePath: "/inscriptions" });

    const deleted = await deleteInscriptionsById(id);

    if (!deleted) {
      return sendJSON(res, 404, { error: "Inscription not found" });
    }

    sendJSON(res, 200, { message: "Inscripcion eliminado con éxito" });
  } catch (error) {
    console.error("Error en deleteInscripcion:", error.message);
    sendJSON(res, 400, { error: error.message });
  }
}

module.exports = {
  postInscription,
  getInscriptions,  
  getInscriptionById,
  deleteInscription
};
