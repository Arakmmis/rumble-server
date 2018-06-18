const _ = require("lodash");
let buff = require("../buff.js");
let dr = require("../dr.js");

async function damageResolution(pkg) {
  //Define
  let { caster, target, val, efDamage } = pkg;
  //Logic
  //Buffs
  let getBuff = caster.status.onAttack.filter(x => x.type === "buff");
  for (efBuff of getBuff) {
    val = buff({ val, efBuff, efDamage });
  }
  //Damage Reduction
  let getDr = target.status.onReceive.filter(x => x.type === "dr");
  for (efDr of getDr) {
    val = dr({ val, efDr, efDamage });
  }
  //Return
  return val;
}

module.exports = damageResolution;
