const _ = require("lodash");

function dr(pkg) {
  //Define
  //   let state = pkg.state;
  let { valDmg, efDr } = pkg;
  //Logic
  valDmg = valDmg - efDr.valDr;
  //Return
  return valDmg;
}

module.exports = dr;
