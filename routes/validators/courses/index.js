const { isValidInt, isValidStr } = require("../../../utils")

function isValidPostCourseData(body) {
  const { name, description, capacity } = body;

  if (!isValidStr({str: name, min_length: 4, max_length: 20})) {
    return {is_valid: false, message: "invalid name"}
  }
  if (!isValidStr({str: description, min_length: 20, max_length: 120})) {
    return {is_valid: false, message: "invalid description"}
  }
  if (!isValidInt({int: capacity, max: 50})) {
    return {is_valid: false, message: "invalid capacity"}
  }

  return {is_valid: true, message: "ok"}
}


function isValidPutCourseData(body) {
  const { name, description, capacity } = body;
  
  if (name && !isValidStr({str: name, min_length: 4, max_length: 20})) {
    return {is_valid: false, message: "invalid name"}
  }
  if (description && !isValidStr({str: description, min_length: 20, max_length: 120})) {
    return {is_valid: false, message: "invalid description"}
  }
  if (capacity && !isValidInt({int: capacity, max: 50})) {
    return {is_valid: false, message: "invalid capacity"}
  }

  return {is_valid: true, message: "ok"}

}

module.exports = { isValidPostCourseData, isValidPutCourseData }