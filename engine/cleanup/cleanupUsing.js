const _ = require("lodash");

async function cleanupUsing(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy } = pkg;
  let using = state[ally].using.concat(state[enemy].using);

  //Logic
  for (skill of using) {
    let turnid = skill.turnid;
    let chars = state[ally].char.concat(state[enemy].char);
    let count = 0;
    //Check
    if (skill.remove === true) {
      continue;
    }
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
      count += status.filter(x => x.turnid === turnid).length;
    }
    if (count === 0) {
      skill.remove = true;
    } else {
      skill.remove = false;
    }
  }
  state[ally].using = using.filter(
    x => x.remove === false && x.caster.team === ally
  );
  state[enemy].using = using.filter(
    x => x.remove === false && x.caster.team === enemy
  );

  //Return
  return state;
}

module.exports = cleanupUsing;
