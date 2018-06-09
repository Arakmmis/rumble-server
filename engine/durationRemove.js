const _ = require("lodash");

async function durationRemove(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy, turnid } = pkg;
  //Logic
  for (char of state[enemy].char) {
    char.status.onSkill = char.status.onSkill.filter(
      x => !(x.turnid === turnid && x.duration === 0)
    );
  }
  //Return
  return state;
}

module.exports = durationRemove;
