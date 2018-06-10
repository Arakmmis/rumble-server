const _ = require("lodash");
let damageResolution = require("./operators/damageResolution");

async function damage(pkg) {
  //Define
  let state = pkg.state;
  let { enemy, effect } = pkg;
  let caster = state[effect.caster.team].char[effect.caster.id];
  let target = pkg.char;
  console.log(caster);
  //Logic
  valDmg = await damageResolution({ state, effect, caster, target });
  console.log(valDmg);
  target.hp = target.hp - valDmg;
  //Return
  return state;
}

module.exports = damage;
