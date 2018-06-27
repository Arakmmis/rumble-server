module.exports = function getSkill(pkg) {
  //Define
  let { ally, item, state } = pkg;
  let { caster, skill } = item;
  //Return
  return state[ally].chars[caster.id].skills[skill];
};
