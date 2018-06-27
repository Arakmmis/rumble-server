const _ = require("lodash");

async function damage(pkg) {
  //Define
  let state = pkg.state;
  let { enemy, effect, char } = pkg;
  let caster = state[effect.caster.team].chars[effect.caster.id];
  let target = char;
  let val = effect.val; //can have parser here ltr
  //Logic
  target.hp = target.hp + val;
  if (target.hp > target.maxHp) {
    target.hp = target.maxHp;
  }
  //Can do side effects here ltr
  //Return
  return state;
}

module.exports = damage;
