let battle = require("./battle.js");
let initiate = require("./initiate.js");
let parser = require("./parsers/parser.js");

function engine() {
  return { battle, initiate, parser };
}

module.exports = engine;
