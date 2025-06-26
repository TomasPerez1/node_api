const { findAll } = require("../services/course_service");

async function getCourses(req, res) {
  try {
    const courses = await findAll();
    // se recibe y se retorna como JSON y se re
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(courses));
  } catch (error) {
    console.error("Error getting courses:", error);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
}

async function postCourse(req, res) {
  try {
    // const courses = await findAll();
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString(); // Convierte el chunk a string y lo concatena
    });

    req.on('end', () => {
      // Aquí `body` contiene el cuerpo completo de la solicitud como una cadena
      console.log('Cuerpo de la solicitud:', body);
      // Puedes procesar el cuerpo aquí, por ejemplo, analizarlo si es JSON
      const parsedBody = JSON.parse(body);
      // validate body
      console.log('Cuerpo parseado (JSON):', parsedBody.name);
      res.writeHead(200, {'Content-Type': "application/json"});
      res.end('Datos recibidos y procesados');
    
      // console.error('Error al analizar el JSON:', error);
      // res.writeHead(400, {'Content-Type': 'text/plain'});
      // res.end('Error al procesar los datos');
    })
    // console.log(req);
    // res.writeHead(200, { "Content-Type": "application/json" });
    // res.end(JSON.stringify("FUNCIONA"));
  } catch (error) {
    console.error("Error getting courses:", error);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
}

module.exports = { getCourses, postCourse };