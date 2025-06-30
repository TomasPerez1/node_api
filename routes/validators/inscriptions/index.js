// const { isValidId, hasCapacity, isAlreadyInscripted } = require("../../../services/inscription_service");


async function isValidPostInscriptionData(body) {
  console.log("INSCRIPTION BODYYY", body)
  const { student_id, course_id } = body;
  console.log("....")
  console.log(student_id, course_id)

  //1. Chequear que student_id y el course_id son correctos
  // const isValidStudent = await isValidId({table: "students", id: student_id});
  // const isValidCourse = await isValidId({table: "courses", id: course_id});

  // if(!isValidStudent || !isValidCourse) {
  //   return {is_valid: false, message: "invalid ID credentials"}
  // }

  // //2. Chequear si existe la inscription
  // if(!isAlreadyInscripted()) {
  //   return {is_valid: false, message: "The Student is already inscripted"}
  // }
  
  // //3. Chequear si hay capacidad en el curso
  // if(!hasCapacity({course_id})) {
  //   return {is_valid: false, message: "The Course has no more capacity"}
  // }

  return {is_valid: true, message: "ok"}
}


// function isValidPutStudentData(body) {
//   const { name, email, age } = body;

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

module.exports = { isValidPostInscriptionData }