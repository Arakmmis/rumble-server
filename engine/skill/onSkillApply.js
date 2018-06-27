const _ = require("lodash");
let damage = require("../effects/damage.js");
let heal = require("../effects/heal.js");
let persistenceTargetCheck = require("./persistenceTargetCheck");

async function apply(pkg) {
  let { state, char, caster } = pkg;
  let turn = state.turn % 2 === 0 ? "even" : "odd";
  let effects = char.status.onSkill.filter(
    x =>
      x.turnid === pkg.turnid &&
      x.caster.id === pkg.caster.id &&
      x.caster.team === pkg.caster.team
  );
  //Logic
  for (effect of effects) {
    //Check Duration
    if (effect.during !== turn) {
      continue;
    }
    //Apply
    if (effect.type === "damage") {
      state = damage({ state, char, effect });
    }
    if (effect.type === "heal") {
      state = heal({ state, char, effect });
    }
  }
  return state;
}

async function onSkillApply(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy, item } = pkg;
  let { caster, turnid } = item;
  let chars = state[ally].char.concat(state[enemy].char);
  for (char of chars) {
    state = await apply({ state, char, turnid, caster });
  }
  //Return
  return state;
}

module.exports = onSkillApply;
