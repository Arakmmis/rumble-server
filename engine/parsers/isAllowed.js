const _ = require("lodash");
let evaluate = require("./evaluate.js");

function isAllowed(pkg) {
  //Define
  let { char, skill } = pkg;
  //Logic
  //Return
  return evaluate({ char, evaluatee: skill.isAllowed });
}

module.exports = isAllowed;
