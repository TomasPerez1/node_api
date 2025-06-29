const { isValidInt, isValidStr, isValidEmail } = require("../../../utils")

function isValidPostStudentData(body) {
  const { name, email, age } = body;

  if (!isValidStr({str: name, min_length: 3, max_length: 20})) {
    return {is_valid: false, message: "invalid name"}
  }
  if (!isValidStr({str: email, min_length: 10, max_length: 50}) || !isValidEmail({email})) {
    return {is_valid: false, message: "invalid email"}
  }
  if (!isValidInt({int: age, min: 18,  max: 90})) {
    return {is_valid: false, message: "invalid age"}
  }

  return {is_valid: true, message: "ok"}

}


module.exports = { isValidPostStudentData, /* isValidPutCourseData */ }