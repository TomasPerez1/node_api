const { getCoursesWithIncriptions, getFullCoursesReport, getEmptyCoursesReport, getPopularCoursesReport } = require("../services/reports_service");
const { sendJSON } = require("../routes/utils");


async function getReportByType(type, req, res) {
  try {
    switch (type) {
      case "courses": {
        const data = await getCoursesWithIncriptions();
        return sendJSON(res, 200, data);
      }
      case "full-courses": {
        const data = await getFullCoursesReport();
        return sendJSON(res, 200, data);
      }
      case "empty-courses": {
        const data = await getEmptyCoursesReport();
        return sendJSON(res, 200, data);
      }
      case "popular-courses": {
        const data = await getPopularCoursesReport();
        return sendJSON(res, 200, data);
      }
      default:
        return sendJSON(res, 404, { error: `Report '${type}' not found` });
    }
  } catch (error) {
    console.error(`Error in report '${type}':`, error.message);
    sendJSON(res, 500, { error: "Internal server error" });
  }
}

async function getCoursesReport(req, res) {
  try {
    const courses_report = await getCoursesWithIncriptions();
    sendJSON(res, 200, courses_report);
  } catch (error) {
    console.error("Error getting courses report:", error);
    sendJSON(res, 500, { error: "Internal server error" });
  }
}

module.exports = {
  getCoursesReport,
  getReportByType,
};
