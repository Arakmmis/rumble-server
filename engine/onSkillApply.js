const _ = require("lodash");
let damage = require("./effects/damage.js");

async function onSkillApply(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { enemy, turnid } = pkg;
  let effects = state[enemy].char[0].status.onSkill.filter(
    x => x.turnid === turnid
  );
  //Logic
  for (effect of effects) {
    console.log(effect);
    if (effect.type === "damage") {
      // effect.duration = -1;
      state = damage({
        state: state,
        enemy: enemy,
        effect: effect
      });
      console.log(state, effect);
    }
  }
  //Return
  return state;
}

module.exports = onSkillApply;
