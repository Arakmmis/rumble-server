const _ = require("lodash");
let damageResolution = require("./operators/damageResolution");

async function damage(pkg) {
  //Define
  let state = pkg.state;
  let { enemy, effect, char } = pkg;
  console.log(state[effect.caster.team]);
  let caster = state[effect.caster.team].char[effect.caster.id];
  console.log(caster)
  let target = char;
  let efDamage = effect;
  let valDmg = effect.valDmg; //can have parser here ltr
  //Logic
  valDmg = await damageResolution({ state, caster, target, valDmg, efDamage });
  target.hp = target.hp - valDmg;
  //Can do side effects here ltr
  //Return
  return state;
}

module.exports = damage;
