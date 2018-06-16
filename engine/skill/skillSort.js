const _ = require("lodash");
let evaluate = require("../parsers/evaluate.js");

function assign(pkg) {
  let { status, char, effect, caster, target, turnid, picture, parent } = pkg;
  let thisTurn = caster.team;
  let nextTurn = caster.team === "odd" ? "even" : "odd";
  console.log(evaluate({ char, evaluatee: effect.duration }));
  return status.concat({
    ...effect,
    duration: evaluate({ char, evaluatee: effect.duration }),
    during: effect.during === "this turn" ? thisTurn : nextTurn,
    caster,
    turnid,
    parent,
    picture
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
    let payload = {
      ...pkg,
      effect,
      char: state[target.team].char[target.id]
    };
    if (effect.type === "damage") {
      let status = state[target.team].char[target.id].status;
      status.onSkill = assign({ status: status.onSkill, ...payload });
    }
    if (effect.type === "dr") {
      let status = state[target.team].char[target.id].status;
      status.onReceive = assign({ status: status.onReceive, ...payload });
    }
    if (effect.type === "buff") {
      let status = state[target.team].char[target.id].status;
      status.onAttack = assign({ status: status.onAttack, ...payload });
    }
    if (effect.type === "allow") {
      let status = state[target.team].char[target.id].status;
      status.onState = assign({ status: status.onState, ...payload });
    }
    if (effect.type === "invul") {
      let status = state[target.team].char[target.id].status;
      status.onState = assign({ status: status.onState, ...payload });
    }
    if (effect.type === "stun") {
      let status = state[target.team].char[target.id].status;
      status.onState = assign({ status: status.onState, ...payload });
    }
    if (effect.type === "state") {
      let status = state[target.team].char[target.id].status;
      status.onState = assign({ status: status.onState, ...payload });
    }
  }
  //Return
  return state;
}

module.exports = skillSort;
