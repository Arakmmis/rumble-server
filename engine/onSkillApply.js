const _ = require("lodash");
let damage = require("./effects/damage.js");

async function apply(pkg) {
  let { state, char } = pkg;
  let effects = char.status.onSkill.filter(x => x.turnid === pkg.turnid);
  //Logic
  for (effect of effects) {
    if (effect.type === "damage") {
      // effect.duration = -1;
      state = damage({ state, char, effect });
    }
  }
  return state;
}

async function onSkillApply(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy, turnid } = pkg;
  let chars = state[ally].char.concat(state[enemy].char);
  for (char of chars) {
    state = await apply({ state, char, turnid });
  }
  //Return
  return state;
}

module.exports = onSkillApply;
