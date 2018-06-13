const _ = require("lodash");
let getSkill = require("./getSkill.js");
let skillSort = require("./skillSort.js");
let onSkillApply = require("./onSkillApply.js");
let energyCost = require("./energy/energyCost");

async function skillQueue(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy, queue } = pkg;
  //Logic
  for (let { pkg, i } of queue.map((x, i) => {
    return { pkg: x, i: i };
  })) {
    //Get Skill
    let skill = getSkill({
      ally: ally,
      caster: pkg.caster,
      skill: pkg.skill,
      state: state
    });
    //Pay Energy Cost
    let cost = skill.cost;
    state = await energyCost({ state, ally, cost });
    //Sort
    state = await skillSort({
      state: state,
      ally: ally,
      enemy: enemy,
      caster: pkg.caster,
      target: pkg.target,
      turnid: pkg.turnid,
      effects: skill.effects
    });
    //Apply Effect
    state = await onSkillApply({
      state: state,
      ally: ally,
      enemy: enemy,
      turnid: pkg.turnid
    });
  }
  //Return
  return state;
}

module.exports = skillQueue;
