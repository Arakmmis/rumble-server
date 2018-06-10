const _ = require("lodash");
let buff = require("../buff.js");
let dr = require("../dr.js");

async function damageResolution(pkg) {
  //Define
  let { caster, target } = pkg;
  let valDmg = effect.valDmg;
  //Logic
  //Buffs
  let getBuff = caster.status.onAttack.filter(x => x.type === "buff");
  for (effect of getBuff) {
    valDmg = buff({ valDmg, effect });
  }
  //Damage Reduction
  let getDr = target.status.onReceive.filter(x => x.type === "dr");
  for (effect of getDr) {
    valDmg = dr({ valDmg, effect });
  }
  //Return
  return valDmg;
}

module.exports = damageResolution;
