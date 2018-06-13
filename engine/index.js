let battle = require("./battle.js");
let initiate = require("./initiate.js");

function engine() {
  return { battle, initiate };
}

module.exports = engine;
