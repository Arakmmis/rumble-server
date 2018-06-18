const _ = require("lodash");
let getSkill = require("./getSkill.js");
let skillTargeting = require("./skillTargeting.js");
let onSkillApply = require("./onSkillApply.js");
let energyCost = require("../energy/energyCost");
let skillCooldown = require("./skillCooldown");
let persistenceCheck = require("./persistenceCheck");

async function skillQueue(pkg) { //Can be simplified
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
    let skill = getSkill({
      ally: ally,
      caster: item.caster,
      skill: item.skill,
      state: state
    });

    //Pay Energy Cost
    let cost = skill.cost;
    state = await energyCost({ state, ally, cost });

    //Counter
    //Set Cooldown
    state = await skillCooldown({
      state,
      caster: item.caster,
      index: item.skill,
      turnid: item.turnid
    });

    //Target -> Need to simplify
    state = await skillTargeting({
      state: state,
      ally: ally,
      enemy: enemy,
      skill: skill,
      caster: item.caster,
      target: item.target,
      turnid: item.turnid,
      parent: item.skill,
      picture: skill.picture,
      effects: skill.effects
    });
  }
  //Sequence
  let allQueue = queue.concat(state[enemy].using);
  for (let { item, i } of allQueue.map((x, i) => {
    return { item: x, i: i };
  })) {
    //Persistence
    //Check Caster
    let persistence = persistenceCheck({
      ally: ally,
      caster: item.caster,
      skill: item.skill,
      state: state,
      item: item
    });
    if (persistence) {
      continue;
    }
    //Apply Effect
    state = await onSkillApply({
      state: state,
      ally: ally,
      enemy: enemy,
      caster: item.caster,
      turnid: item.turnid
    });
  }
  //Post Sequence
  //Assign modified Queue to enemy
  state[enemy].using = allQueue.filter(x => x.caster.team === enemy);
  //Return
  return state;
}

module.exports = skillQueue;
