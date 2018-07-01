let isStun = require("../parsers/isStun");

module.exports = function persistenceCheck(pkg) {
  //Define
  let { state, item } = pkg;
  let { caster } = item;
  let char = state[caster.team].chars[caster.char];
  let skill = char.skills[item.skill];
  let persistence = skill.persistence;
  //Return
  if (persistence === "action") {
    let stun = isStun({ char, skill });
    if (stun) {
      return true;
    }
  }
  if (persistence === "control") {
    let stun = isStun({ char, skill });
    if (stun) {
      item.remove = true;
      return true;
    }
  }
  return false;
};
