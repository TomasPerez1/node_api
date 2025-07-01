const { isValidInt, isValidStr, isValidEmail } = require("../../../utils")

function isValidPostUserData(body) {
  const { name, email, password } = body;

  if (!isValidStr({str: name, min_length: 3, max_length: 20})) {
    return {is_valid: false, message: "invalid name"}
  }
  if (!isValidStr({str: email, min_length: 10, max_length: 50}) || !isValidEmail({email})) {
    return {is_valid: false, message: "invalid email"}
  }
  if (!isValidStr({str: password, min_length: 5,  max_length: 35})) {
    console.log(password, password.length)
    return {is_valid: false, message: "no flaco invalid password"}
  }
  return {is_valid: true, message: "ok"}
}

// function isValidPutUserData(body) {
//   const { name, email, age } = body;
//   console.log(body)
//   if (name && !isValidStr({str: name, min_length: 3, max_length: 20})) {
//     return {is_valid: false, message: "invalid name"}
//   }
//   if (email && !isValidEmail({email: email})) {
//     return {is_valid: false, message: "invalid email"}
//   }
//   if (age && !isValidInt({int: age, min: 18,  max: 90})) {
//     return {is_valid: false, message: "invalid age"}
//   }

//   return {is_valid: true, message: "ok"}
// }

module.exports = { isValidPostUserData, /* isValidPutUserData */ }