module.exports = function getSkill(pkg) {
  //Define
  let { ally, item, state } = pkg;
  let { caster, skill } = item;
  // let index = state[ally].char.findIndex(x => (x.id === caster.id));
  //Return
  return state[ally].char[caster.id].skills[skill];
};
