const _ = require("lodash");

async function durationReduce(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy, turnid, parent, caster } = pkg;
  let chars = state[ally].chars.concat(state[enemy].chars);
  let turn = state.turn % 2 === 0 ? "even" : "odd";
  //Logic
  for (char of chars) {
    let status = _
      .concat(
        char.status.onSkill,
        char.status.onReceive,
        char.status.onAttack,
        char.status.onState
      )
      .filter(
        x =>
          x.turnid === turnid &&
          x.parent === parent &&
          x.caster.char === caster.char &&
          x.caster.team === caster.team &&
          x.during === turn
      );
    for (effect of status) {
      effect.duration = effect.duration - 1;
      effect.current = effect.val;
      effect.active = true;
    }
  }
  //Return
  return state;
}

module.exports = durationReduce;
