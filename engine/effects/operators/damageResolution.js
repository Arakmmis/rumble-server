const _ = require("lodash");
let buff = require("../buff.js");
let dr = require("../dr.js");

async function damageResolution(pkg) {
  //Define
  let { caster, target, valDmg, efDamage } = pkg;
  //Logic
  //Buffs
  let getBuff = caster.status.onAttack.filter(x => x.type === "buff");
  for (efBuff of getBuff) {
    valDmg = buff({ valDmg, efBuff, efDamage });
  }
  //Damage Reduction
  let getDr = target.status.onReceive.filter(x => x.type === "dr");
  for (efDr of getDr) {
    valDmg = dr({ valDmg, efDr, efDamage });
  }
  //Return
  return valDmg;
}

module.exports = damageResolution;
