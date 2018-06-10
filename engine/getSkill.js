module.exports = function getSkill(pkg) {
  //Define
  let { ally, caster, skill, state } = pkg;
  // let index = state[ally].char.findIndex(x => (x.id === caster.id));
  //Return
  return state[ally].char[caster.id].skills[skill];
};
