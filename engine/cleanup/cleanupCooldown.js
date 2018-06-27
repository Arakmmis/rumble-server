const _ = require("lodash");

async function cleanupCooldown(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally } = pkg;
  let turnid = state.turnid;
  let chars = state[ally].chars;
  //Logic
  for (char of chars) {
    let skills = char.skills;
    for (skill of skills) {
      if (skill.counter > 0) {
        skill.counter -= 1;
      }      
    }
  }  
  //Return
  return state;
}

module.exports = cleanupCooldown;
