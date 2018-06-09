let battle = require("./battle.js");
let initiate = require("./initiate.js");

function engine() {
  return {
    battle: battle,
    initiate: initiate
  };
}

module.exports = engine;
