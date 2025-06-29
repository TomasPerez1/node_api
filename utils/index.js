
function isValidInt({int, min = 0, max}) {
  if (typeof(int) === "number" && int >= min && int <= max) {
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

function isValidEmail({email}) {
  const isValidEmailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return isValidEmailRx.test(email);
}

module.exports = { isValidInt, isValidStr, isValidEmail };