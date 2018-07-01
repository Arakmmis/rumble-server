const _ = require("lodash");
let skillQueue = require("./skill/skillQueue");
let duration = require("./duration/duration.js");
let cleanupUsing = require("./cleanup/cleanupUsing");
let cleanupCooldown = require("./cleanup/cleanupCooldown");
let cleanupPersistence = require("./cleanup/cleanupPersistence");
let parser = require("./parsers/parser");
let energyDistribution = require("./energy/energyDistribution");
let energyCost = require("./energy/energyCost");

function getGet(pkg) {
  const getQueue = () => {
    let action = _.cloneDeep(pkg.action);
    let result = _.uniqBy(action, v =>
      [v.turnid, v.caster.char, v.caster.team].join()
    );
    return result.map(x => {
      return {
        ...x,
        remove: false
      };
    });
  };
  const getTurn = state => {
    return state.turn;
  };
  //Return
  return {
    queue: getQueue,
    turn: getTurn
  };
}

function setSet() {
  const setUsing = ({ state, ally, queue }) => {
    state[ally].using = queue;
  };
  const setTurn = state => {
    state.turn++;
    state.turnid = "turn" + state.turn;
  };
  //Return
  return {
    using: setUsing,
    turn: setTurn
  };
}

async function battle(pkg, callback) {
  //Getters
  const getters = getGet(pkg);
  const getQueue = getters.queue;
  const getTurn = getters.turn;

  //Setters
  const setters = setSet();
  const setUsing = setters.using;
  const setTurn = setters.turn;

  //Define
  let state = _.cloneDeep(pkg.state);
  let queue = getQueue();
  let redeem = _.cloneDeep(pkg.redeem);
  let turn = getTurn(state);

  //Assign Turn
  let ally = turn % 2 === 1 ? "odd" : "even";
  let enemy = turn % 2 === 1 ? "even" : "odd";

  //Energy Redeem
  let cost = redeem;
  state = await energyCost({ state, ally, cost });

  //Pre Sequence
  state = await cleanupCooldown({ state, ally });

  //Skill Queue
  state = await skillQueue({ state, ally, enemy, queue });

  //Post Sequence
  state = await duration({ state, ally, enemy, queue });
  setUsing({ state, ally, queue }); //For skill reordering
  state = await cleanupPersistence({ state, ally, enemy, queue });
  state = await cleanupUsing({ state, ally, enemy });
  setTurn(state); //Increase Turn

  //Energy Distribution
  state = await energyDistribution({ state, ally, enemy });

  //Parsing
  let view = await parser({ state, ally, enemy });

  //Exit
  let payload = { state, view };
  callback(payload);
}

module.exports = battle;
