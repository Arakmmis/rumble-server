const _ = require("lodash");
let skillSort = require("./skillSort.js");

async function skillTargeting(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { skill, enemy, turnid, effects } = pkg;
  let targeting = skill.target;  
  //Return
  if (targeting === "all enemies") {
    for (let { char, index } of state[enemy].char.map((x, i) => {
      return {
        char: x,
        index: i
      };
    })) {
      //Exclude Invulnerable Characters
      let invul = char.status.onState.some(s => s.type === "invul");
      if (invul) {
        continue;
      }
      //Assign Target
      let target = {
        id: index,
        team: enemy
      };
      //Sort
      state = await skillSort({
        ...pkg,
        target,
        state
      });
    }
  } else {
    //Sort for Individual
    state = await skillSort({
      ...pkg
    });
  }

  return state;
}

module.exports = skillTargeting;
