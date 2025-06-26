const {isValidInt, isValidStr} = require("../utils")

function setHeader(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
}

function validatePostCourseData(body) {
  const { name, description, capacity } = body;

  if (isValidStr({str: name, min_length: 4, max_length: 20})) {
    // estructurar el error
    return "invalid name"
  }
  if (isValidStr({str: description, min_length: 20, max_length: 120})) {
    return "invalid description"
  }
  if (isValidInt({int: capacity, max: 50})) {
    return "invalid capacity"
  }
}

module.exports = { setHeader, validatePostCourseData }