const _ = require("lodash");
let skillSort = require("./skillSort.js");

async function skillTargeting(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { skill, enemy, item } = pkg;
  let { effects, picture } = skill;
  let { caster, target, turnid } = item;
  let parent = item.skill;
  let targeting = skill.target;
  let persistence = skill.persistence;
  let name = skill.name;
  //Targeting
  if (targeting === "all enemies") {
    for (let { char, index } of state[enemy].chars.map((x, i) => {
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
        ...item,
        target,
        picture,
        persistence,
        name,
        effects,
        parent,
        state
      });
    }
  } else {
    console.log('single!')
    //Sort for Individual
    state = await skillSort({
      state,
      target,
      picture,
      persistence,
      name,
      effects,
      parent,
      ...item
    });
  }
  //Return
  return state;
}

module.exports = skillTargeting;
