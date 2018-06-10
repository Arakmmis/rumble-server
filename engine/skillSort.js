const _ = require("lodash");

async function skillSort(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy, target, turnid, effects } = pkg;
  //Check
  if (state.turnid !== turnid) {
    return state;
  }
  //Logic
  for (effect of effects) {
    if (effect.type === "damage") {
      state[target.team].char[target.id].status.onSkill = state[enemy].char[
        target.id
      ].status.onSkill.concat({ ...effect, turnid: state.turnid });
    }
  }
  //Return
  return state;
}

module.exports = skillSort;
