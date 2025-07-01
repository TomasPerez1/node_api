const db = require("../db");
const { isValidInt } = require("../utils");

async function getCoursesWithIncriptions() {
  const query = `
    SELECT
      c.id,
      c.name,
      c.capacity,
      COUNT(i.id)::INT AS amount_of_inscriptions,
      ROUND(
        (COUNT(i.id)::decimal / c.capacity) * 100
      )::INT AS percentage_occupancy
    FROM courses c
    LEFT JOIN inscriptions i ON c.id = i.course_id
    GROUP BY c.id, c.name, c.capacity
    ORDER BY percentage_occupancy DESC;
  `;

  const result = await db.query(query);
  return result.rows;
}

async function getFullCoursesReport() {
  const query = `
    SELECT
      c.id,
      c.name,
      c.capacity,
      COUNT(i.id)::INT AS amount_of_inscriptions,
      ROUND(
        (COUNT(i.id)::DECIMAL / c.capacity) * 100
      )::INT AS percentage_occupancy
    FROM courses c
    LEFT JOIN inscriptions i ON c.id = i.course_id
    GROUP BY c.id
    HAVING COUNT(i.id) >= c.capacity
    ORDER BY c.id;
  `;

  const result = await db.query(query);
  return result.rows;
}

async function getEmptyCoursesReport() {
  const query = `
    SELECT
      c.id,
      c.name,
      c.capacity,
      COUNT(i.id)::INT AS amount_of_inscriptions,
      ROUND(
        (COUNT(i.id)::DECIMAL / c.capacity) * 100
      )::INT AS percentage_occupancy
    FROM courses c
    LEFT JOIN inscriptions i ON c.id = i.course_id
    GROUP BY c.id
    HAVING COUNT(i.id) = 0
    ORDER BY c.id;
  `;

  const result = await db.query(query);
  return result.rows;
}

async function getPopularCoursesReport() {
  const query = `
    SELECT
      c.id,
      c.name,
      c.capacity,
      COUNT(i.id)::INT AS amount_of_inscriptions,
      ROUND(COUNT(i.id) * 100.0 / c.capacity)::INT AS percentage_occupancy
    FROM courses c
    LEFT JOIN inscriptions i ON c.id = i.course_id
    GROUP BY c.id
    ORDER BY COUNT(i.id) DESC
    LIMIT 1;
  `;

  const result = await db.query(query);
  return result.rows;
}


module.exports = { getCoursesWithIncriptions, getFullCoursesReport, getEmptyCoursesReport, getPopularCoursesReport };