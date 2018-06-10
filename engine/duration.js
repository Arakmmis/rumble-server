const _ = require("lodash");
let getSkill = require("./getSkill.js");
let durationReduce = require("./durationReduce.js");
let durationRemove = require("./durationRemove.js");

async function duration(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy, queue } = pkg;
  //Logic
  for (let pkg of queue) {
    //Get Skill
    let skill = getSkill({
      ally: ally,
      caster: pkg.caster,
      skill: pkg.skill,
      state: state
    });
    //Reduce Duration
    state = await durationReduce({
      state: state,
      ally: ally,
      enemy: enemy,
      turnid: pkg.turnid
    });

    //Remove Effects
    state = await durationRemove({
      state: state,
      ally: ally,
      enemy: enemy,
      turnid: pkg.turnid
    });

    //Sort
    // state = await skillSort({
    //   state: state,
    //   ally: ally,
    //   enemy: enemy,
    //   turnid: pkg.turnid,
    //   effects: skill.effects
    // });
    //Apply Effect
    // state = await onSkillApply({
    //   state: state,
    //   enemy: enemy,
    //   turnid: pkg.turnid
    // });
  }
  //Return
  return state;
}

module.exports = duration;
