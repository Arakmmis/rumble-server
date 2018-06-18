const _ = require("lodash");

function dr(pkg) {
  //Define
  //   let state = pkg.state;
  let { val, efDr } = pkg;
  let valTemp = val;
  //Logic
  val = val - efDr.current;
  efDr.current = Math.max(0, efDr.current - valTemp);
  //Return
  return val;
}

module.exports = dr;
