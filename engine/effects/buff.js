const _ = require("lodash");

function buff(pkg) {
  //Define
  let { valDmg, efBuff, efDamage } = pkg;
  //Logic
  if (_.isObject(efBuff.scope)) {
    if (efBuff.scope[0] === "skills") {
      if (efDamage.name !== efBuff.scope[1]) {
        return valDmg;
      }
    }
  }
  valDmg = valDmg + efBuff.valBuff;
  //Return
  return valDmg;
}

module.exports = buff;
