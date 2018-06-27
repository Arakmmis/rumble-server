const _ = require("lodash");
let damageResolution = require("./operators/damageResolution");

async function damage(pkg) {
  //Define
  let state = pkg.state;
  let { enemy, effect, char } = pkg;
  let caster = state[effect.caster.team].chars[effect.caster.id];
  let target = char;
  let efDamage = effect;
  let val = effect.val; //can have parser here ltr
  //Logic
  val = await damageResolution({ state, caster, target, val, efDamage });
  target.hp = target.hp - val;
  //Can do side effects here ltr
  //Return
  return state;
}

module.exports = damage;
