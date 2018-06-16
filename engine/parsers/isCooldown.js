const _ = require("lodash");

function isCooldown(pkg) {
  //Define
  let { char, skill } = pkg;
  //Logic
  if (skill.counter > 0) {
    return true;
  }
  //Return
  return false;
}

module.exports = isCooldown;
