const _ = require("lodash");

function remove(status, turnid) {
  return status.filter(x => !(x.turnid === turnid && x.duration === 0));
}

async function durationRemove(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy, turnid } = pkg;
  let chars = state[ally].char.concat(state[enemy].char);
  //Logic
  for (char of chars) {    
    char.status.onSkill = remove(char.status.onSkill, turnid);
    char.status.onAttack = remove(char.status.onAttack, turnid);
    char.status.onReceive = remove(char.status.onReceive, turnid);
    char.status.onState = remove(char.status.onState, turnid);
  }
  //Return
  return state;
}

module.exports = durationRemove;
