
function isValidInt({int, max}) {
  if (typeof(int) === "number" && int >= 0 && int <= max) {
    return true;
  }
  return false;
}

function isValidStr({str, min_length, max_length}) {
  if (typeof(str) === "string" && str.length >= min_length && str.length <= max_length) {
    return true;
  }
  return false;
}

module.exports = { isValidInt, isValidStr };