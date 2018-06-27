const _ = require("lodash");
let getSkill = require("./getSkill.js");
let skillTargeting = require("./skillTargeting.js");
let onSkillApply = require("./onSkillApply.js");
let energyCost = require("../energy/energyCost");
let skillCooldown = require("./skillCooldown");
let persistenceCasterCheck = require("./persistenceCasterCheck");

async function skillQueue(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy, queue } = pkg;
  //Logic

  //Post Sequence
  for (let { item, i } of queue
    .filter(x => x.turnid === state.turnid)
    .map((x, i) => {
      return { item: x, i: i };
    })) {
    //Get Skill
    let skill = getSkill({ ally, item, state });

    //Pay Energy Cost
    let cost = skill.cost;
    state = await energyCost({ state, ally, cost });

    //Counter -> Later
    //Set Cooldown
    state = await skillCooldown({ state, item });

    //Target
    state = await skillTargeting({ state, ally, enemy, skill, item });
  }
  //Persistence Target State Check
  // let chars = state[ally].char.concat(statepenemy.char);
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

  //Sequence
  let allQueue = queue.concat(state[enemy].using);
  for (let { item, i } of allQueue.map((x, i) => {
    return { item: x, i: i };
  })) {
    //Persistence
    //Caster State Check
    let persistence = persistenceCasterCheck({ state, item });
    console.log("queue", persistence);
    if (persistence) {
      continue;
    }
    //Apply Effect
    state = await onSkillApply({ state, ally, enemy, item });
  }

  //Post Sequence
  //Assign modified Queue to enemy
  state[enemy].using = allQueue.filter(x => x.caster.team === enemy);
  //Return
  return state;
}

module.exports = skillQueue;
