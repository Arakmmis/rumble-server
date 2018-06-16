module.exports = function persistenceCheck(pkg) {
  //Define
  let { ally, caster, skill, state, item } = pkg;
  let char = state[caster.team].char[caster.id];
  let persistence = char.skills[skill].persistence;
  //Return
  if (persistence === "action") {
    let stun = char.status.onState.some(x => x.type === "stun");
    if (stun) {
      return true;
    }
  }
  if (persistence === "control") {
    let stun = char.status.onState.some(x => x.type === "stun");
    if (stun) {
      item.remove = true;
      return true;
    }
  }
  return false;
  // return state[ally].char[caster.id].skills[skill];
};
