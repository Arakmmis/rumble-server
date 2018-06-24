const _ = require("lodash");
let getSkill = require("../skill/getSkill.js");
let durationReduce = require("./durationReduce.js");
let durationRemove = require("./durationRemove.js");

async function duration(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy, queue } = pkg;
  let allQueue = queue.concat(state[enemy].using);
  //Logic
  for (let item of allQueue) {
    //Get Skill
    let skill = getSkill({ ally, state, item });
    //Reduce Duration
    state = await durationReduce({
      state,
      ally,
      enemy,
      turnid: item.turnid,
      parent: item.skill,
      caster: item.caster
    });

    //Remove Effects
    state = await durationRemove({
      state,
      ally,
      enemy,
      turnid: item.turnid
    });
  }
  //Return
  return state;
}

module.exports = duration;
