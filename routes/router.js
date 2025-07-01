const { getCourses, getCourseById, postCourse, putCourse, deleteCourse } = require("../controllers/course_controller.js");
const { getStudents,  getStudentById,  postStudent,  putStudent,  deleteStudent } = require("../controllers/student_controller.js");
const { getInscriptions, postInscription, getInscriptionById, deleteInscription } = require("../controllers/inscriptions_controller.js");
const { getReportByType } = require("../controllers/report_controller.js");

const routes = {
  courses: {
    GET: getCourses,
    POST: postCourse,
    ID: {
      GET: getCourseById,
      PUT: putCourse,
      DELETE: deleteCourse,
    },
  },
  students: {
    GET: getStudents,
    POST: postStudent,
    ID: {
      GET: getStudentById,
      PUT: putStudent,
      DELETE: deleteStudent,
    },
  },
  inscriptions: {
    GET: getInscriptions,
    POST: postInscription,
    ID: {
      GET: getInscriptionById,
      DELETE: deleteInscription,
    },
  },
  reports: {
    GET: getReportByType,
  },
};

function router(req, res) {
  const segments = req.pathname.split("/").filter(Boolean); 
  const method = req.method;

  const [resource/* , id */] = segments;

  // Ej: /courses
  if (segments.length === 1 && routes[resource]?.[method]) {
    return routes[resource][method](req, res);
  }

  // Ej: /courses/5
  if (segments.length === 2 && routes[resource]?.ID?.[method]) {
    console.log("RUTA ID", segments)
    return routes[resource].ID[method](req, res);
  }

  // Ej: /reports/courses
  if (req.pathname.startsWith("/reports/") && req.method === "GET") {
    const [, , reportName] = req.pathname.split("/");

    return routes.reports.GET(reportName, req, res);
  }


  // Si no matchea
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
}

module.exports = { router };
