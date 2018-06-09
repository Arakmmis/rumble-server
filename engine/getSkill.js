module.exports = function getSkill(pkg) {
  //Define
  let { ally, skill, state } = pkg;
  //Return
  return state[ally].char[0].skills[skill];
};
