const _ = require("lodash");

function buff(pkg) {
  //Define
  let { val, efBuff, efDamage } = pkg;
  //Logic
  if (_.isObject(efBuff.scope)) {
    if (efBuff.scope[0] === "skills") {
      if (efDamage.name !== efBuff.scope[1]) {
        return val;
      }
    }
  }
  val = val + efBuff.val;
  //Return
  return val;
}

module.exports = buff;
