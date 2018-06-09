const _ = require("lodash");

async function durationReduce(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy, turnid } = pkg;
  //Logic
  for (char of state[enemy].char) {
    let onSkill = char.status.onSkill.filter(x => (x.turnid === turnid));
    for (effect of onSkill) {
      effect.duration = effect.duration - 1;
    }
  }
  //Return
  return state;
}

module.exports = durationReduce;
