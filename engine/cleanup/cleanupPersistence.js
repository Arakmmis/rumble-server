const _ = require("lodash");

function remove(status, turnid) {
  return status.filter(x => !(x.turnid === turnid));
}

async function cleanupPersistence(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy, queue } = pkg;
  let allQueue = queue.concat(state[enemy].using);
  let turnid = state.turnid;
  let chars = state[ally].char.concat(state[enemy].char);
  let toRemove = allQueue.filter(x => x.remove === true);
  //Logic
  for (item of toRemove) {
    for (char of chars) {
      char.status.onSkill = remove(char.status.onSkill, item.turnid);
      char.status.onAttack = remove(char.status.onAttack, item.turnid);
      char.status.onReceive = remove(char.status.onReceive, item.turnid);
      char.status.onState = remove(char.status.onState, item.turnid);
    }
  }
  //Return
  return state;
}

module.exports = cleanupPersistence;
