const _ = require("lodash");
let evaluate = require("../parsers/evaluate.js");

function assign(pkg) {
  //Define
  let { status, char, effect, caster, target, turnid, picture, parent } = pkg;
  let thisTurn = caster.team;
  let nextTurn = caster.team === "odd" ? "even" : "odd";
  //Return
  return status.concat({
    ...effect,
    current: effect.val,
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
  let { target, turnid, effects } = pkg;
  let char = state[target.team].char[target.id];
  let status = char.status;
  //Check
  if (state.turnid !== turnid) {
    return state;
  }
  //Logic
  for (effect of effects) {
    let payload = {
      ...pkg,
      effect,
      char
    };
    if (effect.type === "damage") {
      status.onSkill = assign({ status: status.onSkill, ...payload });
    }
    if (effect.type === "heal") {
      status.onSkill = assign({ status: status.onSkill, ...payload });
    }
    if (effect.type === "dr") {
      status.onReceive = assign({ status: status.onReceive, ...payload });
    }
    if (effect.type === "buff") {
      status.onAttack = assign({ status: status.onAttack, ...payload });
    }
    if (effect.type === "allow") {
      status.onState = assign({ status: status.onState, ...payload });
    }
    if (effect.type === "invul") {
      status.onState = assign({ status: status.onState, ...payload });
    }
    if (effect.type === "stun") {
      status.onState = assign({ status: status.onState, ...payload });
    }
    if (effect.type === "state") {
      status.onState = assign({ status: status.onState, ...payload });
    }
    if (effect.type === "ignore") {
      status.onState = assign({ status: status.onState, ...payload });
    }
    if (effect.type === "disable") {
      status.onState = assign({ status: status.onState, ...payload });
    }
    if (effect.type === "mark") {
      status.onState = assign({ status: status.onState, ...payload });
    }
  }
  //Return
  return state;
}

module.exports = skillSort;
