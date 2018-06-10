const _ = require("lodash");

function dr(pkg) {
  //Define
  //   let state = pkg.state;
  let { valDmg, effect } = pkg;
  //Logic
  valDmg = valDmg - effect.valDr;
  //Return
  return valDmg;
}

module.exports = dr;
