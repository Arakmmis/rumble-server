const _ = require("lodash");

function assign(status, effect, caster, turnid) {
  return status.concat({
    ...effect,
    caster,
    turnid
  });
}

async function skillSort(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy, caster, target, turnid, effects } = pkg;
  //Check
  if (state.turnid !== turnid) {
    return state;
  }
  //Logic
  for (effect of effects) {
    if (effect.type === "damage") {
      let status = state[target.team].char[target.id].status;
      status.onSkill = assign(status.onSkill, effect, caster, turnid);
    }
    if (effect.type === "dr") {
      let status = state[target.team].char[target.id].status;
      status.onReceive = assign(status.onReceive, effect, caster, turnid);
    }
    if (effect.type === "buff") {
      let status = state[target.team].char[target.id].status;
      status.onAttack = assign(status.onAttack, effect, caster, turnid);
    }
    if (effect.type === "allow") {
      let status = state[target.team].char[target.id].status;
      status.onState = assign(status.onState, effect, caster, turnid);
    }
    if (effect.type === "invul") {
      let status = state[target.team].char[target.id].status;
      status.onState = assign(status.onState, effect, caster, turnid);
    }
    if (effect.type === "stun") {
      let status = state[target.team].char[target.id].status;
      status.onState = assign(status.onState, effect, caster, turnid);
    }
  }
  //Return
  return state;
}

module.exports = skillSort;
