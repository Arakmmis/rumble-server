const _ = require("lodash");

async function durationReduce(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy, turnid } = pkg;
  let chars = state[ally].char.concat(state[enemy].char);
  //Logic
  for (char of chars) {
    let status = _
      .concat(
        char.status.onSkill,
        char.status.onReceive,
        char.status.onAttack,
        char.status.onState
      )
      .filter(x => x.turnid === turnid);    
    for (effect of status) {
      effect.duration = effect.duration - 1;
    }
  }
  //Return
  return state;
}

module.exports = durationReduce;
