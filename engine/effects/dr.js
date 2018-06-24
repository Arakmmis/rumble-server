const _ = require("lodash");
let isDisable = require("../parsers/isDisable.js");

function dr(pkg) {
  //Define
  //   let state = pkg.state;
  let { val, efDr } = pkg;
  let valTemp = val;
  //Logic
  //Check Ignore Stun
  let disable = isDisable({ char, skill: efDr });
  if (disable) {
    return val; //Escape if ignore is true
  }
  val = val - efDr.current;
  efDr.current = Math.max(0, efDr.current - valTemp);
  //Return
  return val;
}

module.exports = dr;
