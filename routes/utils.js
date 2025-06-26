
function setHeader(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
}

module.exports = { setHeader }