const _ = require("lodash");
let getSkill = require("./getSkill.js");
let skillSort = require("./skillSort.js");
let onSkillApply = require("./onSkillApply.js");
let energyCost = require("./energy/energyCost");
let skillCooldown = require("./skillCooldown");

async function skillQueue(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy, queue } = pkg;
  //Logic
  for (let { item, i } of queue.map((x, i) => {
    return { item: x, i: i };
  })) {
    //Post Sequence
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
    //Set Cooldown
    state = await skillCooldown({
      state,
      caster: item.caster,
      index: item.skill,
      turnid: item.turnid
    });

    //Sequence
    //Sort
    state = await skillSort({
      state: state,
      ally: ally,
      enemy: enemy,
      caster: item.caster,
      target: item.target,
      turnid: item.turnid,
      parent: item.skill,
      picture: skill.picture,
      effects: skill.effects
    });
    //Apply Effect
    state = await onSkillApply({
      state: state,
      ally: ally,
      enemy: enemy,
      caster: item.caster,
      turnid: item.turnid
    });
  }
  //Return
  return state;
}

module.exports = skillQueue;
