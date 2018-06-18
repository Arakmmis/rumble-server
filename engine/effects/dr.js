const _ = require("lodash");

function dr(pkg) {
  //Define
  //   let state = pkg.state;
  let { val, efDr } = pkg;
  //Logic
  val = val - efDr.val;
  //Return
  return val;
}

module.exports = dr;
