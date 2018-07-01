const _ = require("lodash");

function remove(slot, enemy, status) {
  console.log(status, enemy, slot);
  let result = status[slot].filter(
    x => !(x.persistence === "control" && x.caster.team === enemy)
  );
  console.log("result", result);
  return result;
}

async function persistenceCheck(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy } = pkg;
  let chars = state[ally].chars.concat(state[enemy].chars);
  //Logic
  for (let char of chars) {
    //Persistence Check
    //Target State Check
    let status = char.status;
    let invul = status.onState.some(x => x.type === "invul");
    if (invul) {
      let effects = _.concat(
        status.onAttack,
        status.onReceive,
        status.onSkill,
        status.onState
      );
      console.log(effects);
      //Deactivate Mark Action Skill
      let effectsAction = effects.filter(
        x => x.persistence === "action" && x.caster.team === enemy
      );
      console.log(effectsAction);
      for (let effect of effectsAction) {
        effect.active = false;
      }
      //Remove Control Skill
      status.onAttack = remove("onAttack", enemy, status);
      status.onReceive = remove("onReceive", enemy, status);
      status.onSkill = remove("onSkill", enemy, status);
      status.onState = remove("onState", enemy, status);
      console.log(status);
    }
  }
  //Return
  return state;
}

module.exports = persistenceCheck;

// let chars = state[ally].chars.concat(statepenemy.chars);
// for (let char of chars) {
//   //Persistence Check
//   //Target State Check
//   let persistence = persistenceTargetCheck({
//     state,
//     caster,
//     char,
//     skill: effect.parent
//   });
//   if (persistence.status) {
//     state = persistence.state;
//     continue;
//   }
// }
