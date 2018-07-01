const _ = require("lodash");

async function skillCooldown(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { caster, turnid } = pkg.item;
  let index = pkg.item.skill;
  let skill = state[caster.team].chars[caster.char].skills[index];
  //Check
  if (state.turnid !== turnid) {
    return state;
  }
  //Logic
  skill.counter = skill.cooldown;
  //Return
  return state;
}

module.exports = skillCooldown;
