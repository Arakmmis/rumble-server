const _ = require('lodash')

async function skillSort(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy, turnid, effects } = pkg;
  //Check
  if (state.turnid !== turnid) {
    return state;
  }
  //Logic
  for (pkg of effects) {
    if (pkg.type === "damage") {
      state[enemy].char[0].status.onSkill = state[
        enemy
      ].char[0].status.onSkill.concat({ ...pkg, turnid: state.turnid });
    }
  }
  //Return
  return state;
};

module.exports = skillSort